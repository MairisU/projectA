<?php

namespace App\Model;

use PDO;
use Exception;

class Product
{
    private static function getDbConnection(): PDO
    {
        $dsn = 'mysql:host=localhost;dbname=your_database;charset=utf8mb4';
        $username = 'your_username';
        $password = 'your_password';

        try {
            return new PDO($dsn, $username, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (Exception $e) {
            throw new Exception('Database connection error: ' . $e->getMessage());
        }
    }

    public static function getAll(): array
    {
        try {
            $db = self::getDbConnection();
            $stmt = $db->query('SELECT * FROM products');
            return $stmt->fetchAll();
        } catch (Exception $e) {
            throw new Exception('Failed to fetch products: ' . $e->getMessage());
        }
    }

    public static function getById(string $id): ?array
    {
        try {
            $db = self::getDbConnection();
            $stmt = $db->prepare('SELECT * FROM products WHERE id = :id');
            $stmt->execute(['id' => $id]);
            $product = $stmt->fetch();
            return $product ?: null;
        } catch (Exception $e) {
            throw new Exception('Failed to fetch product by ID: ' . $e->getMessage());
        }
    }

    public static function getByCategoryName(string $categoryName): array
    {
        try {
            $db = self::getDbConnection();
            $stmt = $db->prepare('SELECT * FROM products WHERE category = :category');
            $stmt->execute(['category' => $categoryName]);
            return $stmt->fetchAll();
        } catch (Exception $e) {
            throw new Exception('Failed to fetch products by category: ' . $e->getMessage());
        }
    }
}
