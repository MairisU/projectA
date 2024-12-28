<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use GraphQL\Type\Definition\EnumType;
use RuntimeException;
use Throwable;
use App\Model\Product;
use App\Model\Category;
use App\Model\Attribute;

class GraphQL {
    private static function getProductType() {
        return new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => ['type' => Type::nonNull(Type::string())],
                'name' => ['type' => Type::nonNull(Type::string())],
                'price' => ['type' => Type::nonNull(Type::float())],
                'image' => ['type' => Type::nonNull(Type::string())],
                'category' => ['type' => Type::nonNull(Type::string())],
                'inStock' => ['type' => Type::nonNull(Type::boolean())],
                'description' => ['type' => Type::string()],
                'gallery' => ['type' => Type::listOf(Type::string())],
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

    private static function getCategoryType() {
        return new ObjectType([
            'name' => 'Category',
            'fields' => [
                'name' => ['type' => Type::nonNull(Type::string())],
                'products' => [
                    'type' => Type::nonNull(Type::listOf(self::getProductType())),
                    'resolve' => function($category) {
                        return Product::getByCategoryName($category['name']);
                    }
                ]
            ]
        ]);
    }

    static public function handle() {
        try {
            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'categories' => [
                        'type' => Type::nonNull(Type::listOf(self::getCategoryType())),
                        'resolve' => function() {
                            return Category::getAll();
                        }
                    ],
                    'category' => [
                        'type' => self::getCategoryType(),
                        'args' => [
                            'name' => ['type' => Type::nonNull(Type::string())]
                        ],
                        'resolve' => function($root, $args) {
                            return Category::getByName($args['name']);
                        }
                    ],
                    'product' => [
                        'type' => self::getProductType(),
                        'args' => [
                            'id' => ['type' => Type::nonNull(Type::string())]
                        ],
                        'resolve' => function($root, $args) {
                            return Product::getById($args['id']);
                        }
                    ]
                ]
            ]);

            $schema = new Schema([
                'query' => $queryType
            ]);

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage()
                ]
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}

