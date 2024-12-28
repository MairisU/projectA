<?php

namespace App\Model;
use PDO;

abstract class AbstractModel
{
    protected static PDO $connection;

    public static function setConnection(PDO $connection): void
    {
        static::$connection = $connection;
    }

    protected static function getConnection(): PDO
    {
        return static::$connection;
    }
}

