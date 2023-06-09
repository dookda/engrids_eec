<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'eec_web' );

/** MySQL database username */
define( 'DB_USER', 'eec_web' );

/** MySQL database password */
define( 'DB_PASSWORD', 'eecmis2564DB' );

/** MySQL hostname */
define( 'DB_HOST', '150.95.89.49' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'WEx-!iXxS6y)nqY(sLMc |f%nvDERstnMDXK`ykr`F${NZR2v4fLv5b,_nw}TzKX' );
define( 'SECURE_AUTH_KEY',  '}dwSdmtpJ^7InC^b;U+3pB$RmB#X/,b)!w`I1)YcC|n~dRYZgMkA%nIO&.qSju;$' );
define( 'LOGGED_IN_KEY',    'uTTMKfebV$FQ+~>Vyo!&y<v/h{h#8xppU}#nv(f#!QzJXLwmY~VDOd*Izh,.~i?9' );
define( 'NONCE_KEY',        'TkTR5zQ-51$+?*b6-;9JQ?PG-p.#n;Ce[QQqVaG1.hW>g__j&a=LIX(uh)K^lA^_' );
define( 'AUTH_SALT',        '2tXKQ.`|5<8acJ?QoLupRnw~|.XFn)_rca?*fFU)h]c8h^vA0]5a;AEY`w<)meQG' );
define( 'SECURE_AUTH_SALT', '*d/}8.T@{U1a`@w+xy?Z#N;*3^qMaV:=9Cgd1H<$99[T]<O g eG-jRjc]t3aoM[' );
define( 'LOGGED_IN_SALT',   '7uQsQlc r/~9&RY;*yiGW}[VaP;ezrQ}7*e63D{a>-&87hUCd)Ib,xTNT<ZJ&)8^' );
define( 'NONCE_SALT',       'NQ%l39R[g.*^vE?fimx ?$HK`2X^ UHlun@~8^LuFHDZL(pt6hIWJ[>pbjRy2+Y=' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
