<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2b220b06618be019261ff7248a371029
{
    public static $prefixLengthsPsr4 = array (
        'M' => 
        array (
            'Mairi\\ProjectA\\' => 15,
        ),
        'G' => 
        array (
            'GraphQL\\' => 8,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Mairi\\ProjectA\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'GraphQL\\' => 
        array (
            0 => __DIR__ . '/..' . '/webonyx/graphql-php/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2b220b06618be019261ff7248a371029::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2b220b06618be019261ff7248a371029::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit2b220b06618be019261ff7248a371029::$classMap;

        }, null, ClassLoader::class);
    }
}
