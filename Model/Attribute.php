<?php

namespace App\Model;

class Attribute extends AbstractModel
{
    public static function getForProduct(string $productId): array
    {
        $stmt = self::getConnection()->prepare(
            "SELECT a.*, ai.id as item_id, ai.display_value, ai.value 
             FROM attributes a
             JOIN product_attributes pa ON a.id = pa.attribute_id
             JOIN attribute_items ai ON a.id = ai.attribute_id
             WHERE pa.product_id = ?"
        );
        $stmt->execute([$productId]);
        
        $attributes = [];
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
        foreach ($result as $row) {
            if (!isset($attributes[$row['id']])) {
                $attributes[$row['id']] = [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'type' => $row['type'],
                    'items' => []
                ];
            }
            
            $attributes[$row['id']]['items'][] = [
                'id' => $row['item_id'],
                'displayValue' => $row['display_value'],
                'value' => $row['value']
            ];
        }
        
        return array_values($attributes);
    }
}

