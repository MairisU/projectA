<?php

namespace App\Model;

class Category extends AbstractModel
{
    public static function getAll(): array
    {
        $stmt = self::getConnection()->prepare("SELECT * FROM categories");
        $stmt->execute();
        
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public static function getByName(string $name): ?array
    {
        $stmt = self::getConnection()->prepare(
            "SELECT * FROM categories WHERE name = ?"
        );
        $stmt->execute([$name]);
        
        return $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
    }
}

