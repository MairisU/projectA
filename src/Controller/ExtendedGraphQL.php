<?php

namespace App\Controller;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\GraphQL as GraphQLBase;
use App\Model\Product;
use App\Model\Category;

class ExtendedGraphQL extends GraphQL
{
    private static function getProductType()
    {
        return new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => ['type' => Type::nonNull(Type::string())],
                'name' => ['type' => Type::nonNull(Type::string())],
                'price' => ['type' => Type::nonNull(Type::float())],
                'image' => ['type' => Type::nonNull(Type::string())],
                'category' => ['type' => Type::nonNull(Type::string())],
                'inStock' => ['type' => Type::nonNull(Type::boolean())],
                'attributes' => [
                    'type' => Type::nonNull(new ObjectType([
                        'name' => 'ProductAttributes',
                        'fields' => [
                            'sizes' => ['type' => Type::listOf(Type::string())],
                            'colors' => ['type' => Type::listOf(Type::string())],
                            'capacity' => ['type' => Type::listOf(Type::string())],
                            'usbports' => ['type' => Type::listOf(Type::string())],
                            'touchid' => ['type' => Type::listOf(Type::string())]
                        ]
                    ]))
                ]
            ]
        ]);
    }

    private static function getCategoryType()
    {
        return new ObjectType([
            'name' => 'Category',
            'fields' => [
                'name' => ['type' => Type::nonNull(Type::string())],
                'products' => [
                    'type' => Type::listOf(self::getProductType()),
                    'resolve' => function($category) {
                        try {
                            $products = Product::getByCategoryName($category['name']);
                            if ($products === null) {
                                throw new \Exception("No products found for category");
                            }
                            return $products;
                        } catch (\Throwable $e) {
                            throw new \Exception("Failed to fetch products: " . $e->getMessage());
                        }
                    }
                ]
            ]
        ]);
    }

    public static function handle(): string
    {
        try {
            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'products' => [
                        'type' => Type::nonNull(Type::listOf(self::getProductType())),
                        'resolve' => function () {
                            try {
                                $products = Product::getAll();
                                if ($products === null) {
                                    throw new \Exception("No products found");
                                }
                                return $products;
                            } catch (\Throwable $e) {
                                throw new \Exception("Failed to fetch products: " . $e->getMessage());
                            }
                        }
                    ],
                    'product' => [
                        'type' => self::getProductType(),
                        'args' => [
                            'id' => Type::nonNull(Type::string())
                        ],
                        'resolve' => function ($root, $args) {
                            try {
                                $product = Product::getById($args['id']);
                                if ($product === null) {
                                    throw new \Exception("Product not found");
                                }
                                return $product;
                            } catch (\Throwable $e) {
                                throw new \Exception("Failed to fetch product: " . $e->getMessage());
                            }
                        }
                    ],
                    'categories' => [
                        'type' => Type::nonNull(Type::listOf(self::getCategoryType())),
                        'resolve' => function () {
                            try {
                                $categories = Category::getAll();
                                if ($categories === null) {
                                    throw new \Exception("No categories found");
                                }
                                return $categories;
                            } catch (\Throwable $e) {
                                throw new \Exception("Failed to fetch categories: " . $e->getMessage());
                            }
                        }
                    ],
                    'category' => [
                        'type' => self::getCategoryType(),
                        'args' => [
                            'name' => Type::nonNull(Type::string())
                        ],
                        'resolve' => function ($root, $args) {
                            try {
                                $category = Category::getByName($args['name']);
                                if ($category === null) {
                                    throw new \Exception("Category not found");
                                }
                                return $category;
                            } catch (\Throwable $e) {
                                throw new \Exception("Failed to fetch category: " . $e->getMessage());
                            }
                        }
                    ]
                ]
            ]);

            $schema = new Schema([
                'query' => $queryType
            ]);

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new \RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            if (!isset($input['query'])) {
                throw new \RuntimeException('No query provided');
            }

            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();

            header('Content-Type: application/json; charset=UTF-8');
            return json_encode($output);
        } catch (\Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage()
                ]
            ];
            header('Content-Type: application/json; charset=UTF-8');
            return json_encode($output);
        }
    }
}

