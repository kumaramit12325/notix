-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2025 at 09:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `name`, `tag`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'First name', '{{first_name}}', 'Subscriber\'s first name', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(2, 'Last name', '{{last_name}}', 'Subscriber\'s last name', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(3, 'Email', '{{email}}', 'Subscriber\'s email address', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(4, 'Phone', '{{phone}}', 'Subscriber\'s phone number', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(5, 'Gender', '{{gender}}', 'Subscriber\'s gender', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(6, 'Date Of birth', '{{dob}}', 'Subscriber\'s date of birth', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(7, 'Language', '{{language}}', 'Subscriber\'s preferred language', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(8, 'Profile ID', '{{profile_id}}', 'Unique profile identifier', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(9, 'Country', '{{country}}', 'Subscriber\'s country', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(10, 'City', '{{city}}', 'Subscriber\'s city', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(11, 'Age', '{{age}}', 'Subscriber\'s age', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(12, 'Occupation', '{{occupation}}', 'Subscriber\'s occupation', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(13, 'Company', '{{company}}', 'Subscriber\'s company name', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(14, 'Industry', '{{industry}}', 'Subscriber\'s industry', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(15, 'Interests', '{{interests}}', 'Subscriber\'s interests', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(16, 'Website', '{{website}}', 'Subscriber\'s website URL', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(17, 'Social Media', '{{social_media}}', 'Subscriber\'s social media handles', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(18, 'Subscription Date', '{{subscription_date}}', 'Date when subscriber joined', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(19, 'Last Activity', '{{last_activity}}', 'Last activity timestamp', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(20, 'Campaign Source', '{{campaign_source}}', 'Source of the campaign', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(21, 'Referral Code', '{{referral_code}}', 'Referral code used', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(22, 'User Agent', '{{user_agent}}', 'Browser user agent string', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(23, 'IP Address', '{{ip_address}}', 'Subscriber\'s IP address', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(24, 'Timezone', '{{timezone}}', 'Subscriber\'s timezone', 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46');

-- --------------------------------------------------------

--
-- Table structure for table `automations`
--

CREATE TABLE `automations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `schedule_text` varchar(255) DEFAULT NULL,
  `next_run` timestamp NULL DEFAULT NULL,
  `domain` varchar(255) NOT NULL DEFAULT 'All',
  `type` varchar(255) NOT NULL DEFAULT 'Recurring',
  `schedule` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `domain_segment` varchar(255) NOT NULL DEFAULT 'All',
  `sent` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `clicks` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `source` varchar(255) NOT NULL DEFAULT 'LaraPush Panel',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `domains`
--

CREATE TABLE `domains` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `domain` varchar(255) NOT NULL,
  `desktop_count` int(11) NOT NULL DEFAULT 0,
  `mobile_count` int(11) NOT NULL DEFAULT 0,
  `total_count` int(11) NOT NULL DEFAULT 0,
  `status` enum('Active','Inactive','Pending') NOT NULL DEFAULT 'Active',
  `has_warning` tinyint(1) NOT NULL DEFAULT 0,
  `is_wordpress` tinyint(1) NOT NULL DEFAULT 0,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`id`, `domain`, `desktop_count`, `mobile_count`, `total_count`, `status`, `has_warning`, `is_wordpress`, `is_default`, `created_at`, `updated_at`) VALUES
(1, 'naughtytalk.s6-tastewp.com', 1, 0, 1, 'Active', 1, 1, 0, '2025-09-01 00:22:28', '2025-09-01 00:22:28'),
(2, 'test5.larapush.com', 0, 0, 0, 'Active', 1, 1, 0, '2025-09-01 00:22:28', '2025-09-01 00:22:28'),
(3, 'eu2.wpsandbox.org', 23, 5, 28, 'Active', 1, 1, 0, '2025-09-01 00:22:28', '2025-09-01 00:22:28'),
(4, 'entranced-scarab-b5c838.instawp.xyz', 2, 0, 2, 'Active', 1, 1, 0, '2025-09-01 00:22:28', '2025-09-01 00:22:28'),
(5, 'test1.larapu.sh', 50, 18, 68, 'Active', 0, 1, 0, '2025-09-01 00:22:28', '2025-09-01 00:22:28'),
(6, 'Default', 13, 1, 14, 'Active', 0, 1, 1, '2025-09-01 00:22:28', '2025-09-01 00:22:28'),
(7, 'naughtytalk.s6-tastewp.com', 1, 0, 1, 'Active', 1, 1, 0, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(8, 'test5.larapush.com', 0, 0, 0, 'Active', 1, 1, 0, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(9, 'eu2.wpsandbox.org', 23, 5, 28, 'Active', 1, 1, 0, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(10, 'entranced-scarab-b5c838.instawp.xyz', 2, 0, 2, 'Active', 1, 1, 0, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(11, 'test1.larapu.sh', 50, 18, 68, 'Active', 0, 1, 0, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(12, 'Default', 13, 1, 14, 'Active', 0, 1, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lp_links`
--

CREATE TABLE `lp_links` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `reference_id` bigint(20) UNSIGNED DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `lp_link` varchar(255) NOT NULL,
  `desktop` int(11) NOT NULL DEFAULT 0,
  `mobile` int(11) NOT NULL DEFAULT 0,
  `status` enum('Active','Paused') NOT NULL DEFAULT 'Active',
  `target_link` varchar(255) DEFAULT NULL,
  `domain` varchar(255) DEFAULT NULL,
  `prompt_text` text DEFAULT NULL,
  `clicks` int(11) NOT NULL DEFAULT 0,
  `conversions` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lp_links`
--

INSERT INTO `lp_links` (`id`, `type`, `reference_id`, `url`, `user_id`, `name`, `handle`, `lp_link`, `desktop`, `mobile`, `status`, `target_link`, `domain`, `prompt_text`, `clicks`, `conversions`, `is_active`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, NULL, 1, 'wwe', '@wwe', 'https://demo.larapu.sh/yt/4SlikplR', 4, 1, 'Active', 'https://wwe.com', 'wwe.com', 'Check out WWE content', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(2, NULL, NULL, NULL, 1, 'larapush', '@larapush', 'https://demo.larapu.sh/yt/VCDTmBTp', 2, 0, 'Active', 'https://larapush.com', 'larapush.com', 'Laravel development services', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(3, NULL, NULL, NULL, 1, 'ndtv', '@ndtv', 'https://demo.larapu.sh/yt/antPdliy', 0, 0, 'Active', 'https://ndtv.com', 'ndtv.com', 'Latest news from NDTV', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(4, NULL, NULL, NULL, 1, 'invideoofficial', '@invideoofficial', 'https://demo.larapu.sh/yt/5BV2IiTt', 0, 0, 'Active', 'https://invideo.io', 'invideo.io', 'Create amazing videos', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(5, NULL, NULL, NULL, 1, 'kommuneindia', '@kommuneindia', 'https://demo.larapu.sh/yt/QTr0p1Ng', 0, 0, 'Active', 'https://kommune.in', 'kommune.in', 'Indian music and culture', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(6, NULL, NULL, NULL, 1, 'watchcartvindia', '@watchcartvindia', 'https://demo.larapu.sh/yt/IfdPdWFj', 1, 0, 'Active', 'https://watchcartv.com', 'watchcartv.com', 'Watch Cartoon TV India', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(7, NULL, NULL, NULL, 1, 'rankknar', '@rankknar', 'https://demo.larapu.sh/yt/2KSBUq4R', 1, 0, 'Active', 'https://rankknar.com', 'rankknar.com', 'Gaming and entertainment', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(8, NULL, NULL, NULL, 1, 'techcrunch', '@techcrunch', 'https://demo.larapu.sh/yt/techcrunch123', 5, 2, 'Paused', 'https://techcrunch.com', 'techcrunch.com', 'Latest tech news and startups', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(9, NULL, NULL, NULL, 1, 'verge', '@verge', 'https://demo.larapu.sh/yt/verge456', 3, 1, 'Active', 'https://theverge.com', 'theverge.com', 'Technology, science, art, and culture', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(10, NULL, NULL, NULL, 1, 'wired', '@wired', 'https://demo.larapu.sh/yt/wired789', 2, 0, 'Active', 'https://wired.com', 'wired.com', 'In-depth reporting on technology', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(11, NULL, NULL, NULL, 1, 'mashable', '@mashable', 'https://demo.larapu.sh/yt/mashable101', 4, 1, 'Active', 'https://mashable.com', 'mashable.com', 'Digital culture and technology', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(12, NULL, NULL, NULL, 1, 'engadget', '@engadget', 'https://demo.larapu.sh/yt/engadget202', 1, 0, 'Paused', 'https://engadget.com', 'engadget.com', 'Consumer electronics and gadgets', 0, 0, 1, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(13, 'youtube', 1, NULL, 1, 'wwe', '@wwe', 'https://demo.larapu.sh/yt/8b2cef66', 0, 0, 'Active', NULL, NULL, NULL, 0, 0, 1, '2025-09-01 00:25:14', '2025-09-01 00:25:14'),
(14, 'youtube', 2, NULL, 1, 'larapush', '@larapush', 'https://demo.larapu.sh/yt/94bc554d', 0, 0, 'Active', NULL, NULL, NULL, 0, 0, 1, '2025-09-01 00:25:14', '2025-09-01 00:25:14'),
(15, 'youtube', 3, NULL, 1, 'ndtv', '@ndtv', 'https://demo.larapu.sh/yt/4bb649e4', 0, 0, 'Active', NULL, NULL, NULL, 0, 0, 1, '2025-09-01 00:25:14', '2025-09-01 00:25:14'),
(16, 'youtube', 4, NULL, 1, 'invideoofficial', '@invideoofficial', 'https://demo.larapu.sh/yt/caf945b5', 0, 0, 'Active', NULL, NULL, NULL, 0, 0, 1, '2025-09-01 00:25:14', '2025-09-01 00:25:14'),
(17, 'youtube', 5, NULL, 1, 'kommuneindia', '@kommuneindia', 'https://demo.larapu.sh/yt/3a55e7b2', 0, 0, 'Active', NULL, NULL, NULL, 0, 0, 1, '2025-09-01 00:25:14', '2025-09-01 00:25:14'),
(18, 'youtube', 6, NULL, 1, 'watchcartvindia', '@watchcartvindia', 'https://demo.larapu.sh/yt/48bbe602', 0, 0, 'Active', NULL, NULL, NULL, 0, 0, 1, '2025-09-01 00:25:14', '2025-09-01 00:25:14'),
(19, 'youtube', 7, NULL, 1, 'rankknar', '@rankknar', 'https://demo.larapu.sh/yt/a70c2c0e', 0, 0, 'Active', NULL, NULL, NULL, 0, 0, 1, '2025-09-01 00:25:14', '2025-09-01 00:25:14');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_01_15_000000_create_lp_links_table', 1),
(5, '2025_08_02_110156_add_phone_role_status_to_users_table', 1),
(6, '2025_08_05_055914_create_orders_table', 1),
(7, '2025_08_05_055923_create_user_payments_table', 1),
(8, '2025_08_27_055353_create_user_sites_table', 1),
(9, '2025_08_29_061234_create_attributes_table', 1),
(10, '2025_08_29_120001_create_campaigns_table', 1),
(11, '2025_08_29_120002_create_automations_table', 1),
(12, '2025_08_29_120003_create_welcome_pushes_table', 1),
(13, '2025_08_29_120004_create_youtube_channels_table', 1),
(14, '2025_08_29_120005_create_segmentation_rules_table', 1),
(15, '2025_08_30_093705_add_status_to_you_tube_channels_table', 1),
(16, '2025_08_30_094632_add_type_and_reference_to_lp_links_table', 1),
(17, '2025_09_01_042431_create_domains_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('Pending','Processing','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  `payment_status` varchar(255) NOT NULL DEFAULT 'Pending',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `delivery_date` timestamp NULL DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_number`, `product_name`, `description`, `amount`, `quantity`, `total_amount`, `status`, `payment_status`, `order_date`, `delivery_date`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 'ORD20250901C52DBF', 'Apple Watch Series 9', 'Sample order for Apple Watch Series 9', 399.99, 3, 1199.97, 'Completed', 'Failed', '2025-08-12 00:24:45', '2025-09-07 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(2, 1, 'ORD20250901B306CB', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 2, 2399.98, 'Processing', 'Failed', '2025-08-08 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(3, 1, 'ORD20250901A4053B', 'Apple Watch Series 9', 'Sample order for Apple Watch Series 9', 399.99, 1, 399.99, 'Cancelled', 'Paid', '2025-08-14 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(4, 2, 'ORD20250901FB10DD', 'Apple Watch Series 9', 'Sample order for Apple Watch Series 9', 399.99, 1, 399.99, 'Pending', 'Paid', '2025-08-21 00:24:45', '2025-09-05 00:24:45', NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(5, 2, 'ORD2025090146E9AF', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 2, 2399.98, 'Pending', 'Failed', '2025-08-18 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(6, 2, 'ORD202509017C2A3B', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 3, 3599.97, 'Processing', 'Failed', '2025-08-11 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(7, 2, 'ORD2025090185B58E', 'iPhone 15 Pro', 'Sample order for iPhone 15 Pro', 999.99, 3, 2999.97, 'Completed', 'Failed', '2025-08-23 00:24:45', '2025-09-07 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(8, 2, 'ORD20250901D4C091', 'iPad Air', 'Sample order for iPad Air', 599.99, 1, 599.99, 'Processing', 'Paid', '2025-08-27 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(9, 3, 'ORD20250901FA3630', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 2, 2399.98, 'Processing', 'Paid', '2025-08-25 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(10, 3, 'ORD2025090166334F', 'iPad Air', 'Sample order for iPad Air', 599.99, 1, 599.99, 'Completed', 'Pending', '2025-08-03 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(11, 4, 'ORD202509012BE56E', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 1, 1199.99, 'Pending', 'Paid', '2025-08-11 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(12, 4, 'ORD202509016FBEE8', 'iPhone 15 Pro', 'Sample order for iPhone 15 Pro', 999.99, 2, 1999.98, 'Pending', 'Failed', '2025-08-20 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(13, 4, 'ORD20250901170926', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 2, 2399.98, 'Completed', 'Paid', '2025-08-18 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(14, 4, 'ORD202509010FAF82', 'iPad Air', 'Sample order for iPad Air', 599.99, 1, 599.99, 'Cancelled', 'Paid', '2025-08-25 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(15, 5, 'ORD20250901C1A936', 'iPhone 15 Pro', 'Sample order for iPhone 15 Pro', 999.99, 2, 1999.98, 'Pending', 'Failed', '2025-08-24 00:24:45', '2025-09-03 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(16, 5, 'ORD20250901C1C556', 'iPhone 15 Pro', 'Sample order for iPhone 15 Pro', 999.99, 3, 2999.97, 'Processing', 'Failed', '2025-08-02 00:24:45', '2025-09-04 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(17, 6, 'ORD20250901937E0F', 'AirPods Pro', 'Sample order for AirPods Pro', 249.99, 1, 249.99, 'Completed', 'Pending', '2025-08-13 00:24:45', '2025-09-04 00:24:45', NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(18, 6, 'ORD2025090144E095', 'AirPods Pro', 'Sample order for AirPods Pro', 249.99, 1, 249.99, 'Completed', 'Failed', '2025-08-06 00:24:45', '2025-09-04 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(19, 6, 'ORD2025090182CC25', 'iPhone 15 Pro', 'Sample order for iPhone 15 Pro', 999.99, 2, 1999.98, 'Cancelled', 'Paid', '2025-08-16 00:24:45', '2025-09-07 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(20, 6, 'ORD20250901EF6498', 'Apple Watch Series 9', 'Sample order for Apple Watch Series 9', 399.99, 1, 399.99, 'Cancelled', 'Failed', '2025-08-27 00:24:45', '2025-09-04 00:24:45', NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(21, 6, 'ORD202509016004A2', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 3, 3599.97, 'Completed', 'Pending', '2025-08-10 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(22, 7, 'ORD202509012BC1F4', 'iPhone 15 Pro', 'Sample order for iPhone 15 Pro', 999.99, 1, 999.99, 'Cancelled', 'Paid', '2025-08-08 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(23, 7, 'ORD20250901CA2186', 'iPad Air', 'Sample order for iPad Air', 599.99, 1, 599.99, 'Cancelled', 'Failed', '2025-08-19 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(24, 7, 'ORD20250901E1F8BD', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 3, 3599.97, 'Cancelled', 'Paid', '2025-08-25 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(25, 8, 'ORD202509018C94BC', 'iPad Air', 'Sample order for iPad Air', 599.99, 3, 1799.97, 'Pending', 'Failed', '2025-08-09 00:24:45', '2025-09-06 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(26, 8, 'ORD20250901D0CF84', 'Apple Watch Series 9', 'Sample order for Apple Watch Series 9', 399.99, 1, 399.99, 'Pending', 'Pending', '2025-08-25 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(27, 8, 'ORD20250901833777', 'Apple Watch Series 9', 'Sample order for Apple Watch Series 9', 399.99, 3, 1199.97, 'Cancelled', 'Pending', '2025-08-21 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(28, 9, 'ORD20250901D63650', 'iPad Air', 'Sample order for iPad Air', 599.99, 1, 599.99, 'Processing', 'Failed', '2025-08-20 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(29, 9, 'ORD20250901D54B4D', 'iPhone 15 Pro', 'Sample order for iPhone 15 Pro', 999.99, 2, 1999.98, 'Cancelled', 'Paid', '2025-08-29 00:24:45', '2025-09-03 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(30, 9, 'ORD20250901A05D5B', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 1, 1199.99, 'Processing', 'Failed', '2025-08-06 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(31, 9, 'ORD20250901738503', 'iPad Air', 'Sample order for iPad Air', 599.99, 1, 599.99, 'Pending', 'Failed', '2025-08-10 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(32, 9, 'ORD202509019FCFF1', 'iPhone 15 Pro', 'Sample order for iPhone 15 Pro', 999.99, 2, 1999.98, 'Processing', 'Paid', '2025-08-05 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(33, 10, 'ORD20250901CF23E9', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 1, 1199.99, 'Cancelled', 'Paid', '2025-08-16 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(34, 10, 'ORD202509010559FC', 'Apple Watch Series 9', 'Sample order for Apple Watch Series 9', 399.99, 1, 399.99, 'Completed', 'Failed', '2025-08-08 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(35, 10, 'ORD20250901EBAD61', 'AirPods Pro', 'Sample order for AirPods Pro', 249.99, 1, 249.99, 'Cancelled', 'Failed', '2025-08-08 00:24:45', '2025-09-04 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(36, 11, 'ORD20250901361EBB', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 1, 1199.99, 'Cancelled', 'Pending', '2025-08-22 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(37, 11, 'ORD202509011E6B75', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 2, 2399.98, 'Processing', 'Paid', '2025-08-27 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(38, 11, 'ORD2025090126DB02', 'iPhone 15 Pro', 'Sample order for iPhone 15 Pro', 999.99, 3, 2999.97, 'Processing', 'Paid', '2025-08-16 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(39, 11, 'ORD202509013B3A22', 'iPhone 15 Pro', 'Sample order for iPhone 15 Pro', 999.99, 2, 1999.98, 'Cancelled', 'Pending', '2025-08-17 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(40, 12, 'ORD20250901CD9CE2', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 3, 3599.97, 'Cancelled', 'Paid', '2025-08-05 00:24:45', '2025-09-08 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(41, 12, 'ORD2025090140E219', 'AirPods Pro', 'Sample order for AirPods Pro', 249.99, 3, 749.97, 'Processing', 'Failed', '2025-08-29 00:24:45', '2025-09-07 00:24:45', NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(42, 12, 'ORD20250901D94263', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 1, 1199.99, 'Completed', 'Failed', '2025-08-10 00:24:45', '2025-09-06 00:24:45', NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(43, 13, 'ORD2025090199FFE2', 'Apple Watch Series 9', 'Sample order for Apple Watch Series 9', 399.99, 3, 1199.97, 'Pending', 'Failed', '2025-08-09 00:24:45', '2025-09-06 00:24:45', NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(44, 13, 'ORD2025090159E16F', 'Apple Watch Series 9', 'Sample order for Apple Watch Series 9', 399.99, 2, 799.98, 'Pending', 'Failed', '2025-08-29 00:24:45', '2025-09-05 00:24:45', 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:46'),
(45, 13, 'ORD2025090156AECF', 'MacBook Air M2', 'Sample order for MacBook Air M2', 1199.99, 2, 2399.98, 'Pending', 'Paid', '2025-08-14 00:24:45', '2025-09-06 00:24:45', NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(46, 13, 'ORD202509016BCAA0', 'AirPods Pro', 'Sample order for AirPods Pro', 249.99, 2, 499.98, 'Processing', 'Paid', '2025-08-04 00:24:45', '2025-09-03 00:24:45', NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(47, 13, 'ORD2025090122D038', 'iPad Air', 'Sample order for iPad Air', 599.99, 3, 1799.97, 'Pending', 'Failed', '2025-08-09 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(48, 14, 'ORD202509015A12F4', 'iPad Air', 'Sample order for iPad Air', 599.99, 1, 599.99, 'Completed', 'Failed', '2025-08-04 00:24:45', NULL, NULL, '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(49, 14, 'ORD20250901E5B6A6', 'iPad Air', 'Sample order for iPad Air', 599.99, 2, 1199.98, 'Completed', 'Paid', '2025-08-11 00:24:45', NULL, 'Sample order notes', '2025-09-01 00:24:45', '2025-09-01 00:24:45');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `segmentation_rules`
--

CREATE TABLE `segmentation_rules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `domains` varchar(255) NOT NULL DEFAULT 'All',
  `condition` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('RS1EtirZgsxYGi4ijAVHhSGIitV14CNy2RL2XcqX', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoibnJ1ZEJ6eWZ5WGhwNkdkbU1vUXBST1FpUTJrbWxWdE9RbkpIZ3JzUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9kb21haW5zL21vZGlmeSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1756714490);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('Admin','User','Agent') NOT NULL DEFAULT 'User',
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `role`, `status`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@example.com', '1234567890', 'Admin', 'Active', NULL, '$2y$12$vL42mb3SyqCiAJVEYdwKyufkGZT/vGljWWyryND5ZrE94pTJh4oj6', NULL, '2025-09-01 00:24:42', '2025-09-01 00:24:42'),
(2, 'Test User', 'user@example.com', '1234567890', 'User', 'Active', NULL, '$2y$12$pmYrx91SUyYV4c82rmSlhObebjXci4GwL7kN5GrWkIpZm4xE2unEC', NULL, '2025-09-01 00:24:42', '2025-09-01 00:24:42'),
(3, 'Test Agent', 'agent@example.com', NULL, 'Agent', 'Active', NULL, '$2y$12$uYmpWgFMK1kwINQdvMg0NuDNGr2FN6MU2KGh/OtzJ2FKPXetL3S7y', NULL, '2025-09-01 00:24:43', '2025-09-01 00:24:43'),
(4, 'demo user', 'demouser@gmail.com', '1234567890', 'User', 'Active', NULL, '$2y$12$M7qSMrY0QLdI3BcQsoQttuOW6SFUJ5izyaxBV1hDaUXA4Dorx1hsW', NULL, '2025-09-01 00:24:43', '2025-09-01 00:24:43'),
(5, 'Tyrell Hermiston', 'emmett73@example.net', '(469) 833-9458', 'Admin', 'Inactive', '2025-09-01 00:24:45', '$2y$12$EX.BnVl10SoHLvBeXFczTOIw/1jHwRGxNs.3gSMzGkXVZmjShrlpG', 'iuXav7ceaE', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(6, 'Sonia Jerde', 'wilhelmine11@example.net', '706-809-7910', 'User', 'Inactive', '2025-09-01 00:24:45', '$2y$12$EX.BnVl10SoHLvBeXFczTOIw/1jHwRGxNs.3gSMzGkXVZmjShrlpG', 'lR9Hs6h5s1', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(7, 'Fleta Kuhic', 'evangeline19@example.net', '(364) 602-7007', 'Admin', 'Active', '2025-09-01 00:24:45', '$2y$12$EX.BnVl10SoHLvBeXFczTOIw/1jHwRGxNs.3gSMzGkXVZmjShrlpG', 'JPPM3trSkw', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(8, 'Amiya Casper', 'reta.cruickshank@example.org', '806-938-6522', 'Agent', 'Inactive', '2025-09-01 00:24:45', '$2y$12$EX.BnVl10SoHLvBeXFczTOIw/1jHwRGxNs.3gSMzGkXVZmjShrlpG', 'qbDdzIXva2', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(9, 'Garrett Bergstrom III', 'btreutel@example.net', '+1-325-862-8059', 'User', 'Inactive', '2025-09-01 00:24:45', '$2y$12$EX.BnVl10SoHLvBeXFczTOIw/1jHwRGxNs.3gSMzGkXVZmjShrlpG', 'HMlwXpUl4f', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(10, 'Loraine Homenick', 'bernier.stanford@example.org', '(740) 504-5148', 'User', 'Active', '2025-09-01 00:24:45', '$2y$12$EX.BnVl10SoHLvBeXFczTOIw/1jHwRGxNs.3gSMzGkXVZmjShrlpG', 'THzFcyMtV4', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(11, 'Prof. Ruby Wintheiser', 'karine81@example.net', '628-558-2165', 'User', 'Inactive', '2025-09-01 00:24:45', '$2y$12$EX.BnVl10SoHLvBeXFczTOIw/1jHwRGxNs.3gSMzGkXVZmjShrlpG', '5gTjk7XOSC', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(12, 'Millie Jast', 'greyson.bogan@example.org', '415-933-6371', 'Agent', 'Inactive', '2025-09-01 00:24:45', '$2y$12$EX.BnVl10SoHLvBeXFczTOIw/1jHwRGxNs.3gSMzGkXVZmjShrlpG', 'qIDO61Tlm7', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(13, 'Julius Jakubowski', 'mohammad22@example.org', '(551) 893-2271', 'Agent', 'Inactive', '2025-09-01 00:24:45', '$2y$12$EX.BnVl10SoHLvBeXFczTOIw/1jHwRGxNs.3gSMzGkXVZmjShrlpG', 'jt5xQTWQkm', '2025-09-01 00:24:45', '2025-09-01 00:24:45'),
(14, 'Nova Hagenes', 'ryan.jaden@example.com', '(610) 438-6366', 'Agent', 'Inactive', '2025-09-01 00:24:45', '$2y$12$EX.BnVl10SoHLvBeXFczTOIw/1jHwRGxNs.3gSMzGkXVZmjShrlpG', '0saZC32chb', '2025-09-01 00:24:45', '2025-09-01 00:24:45');

-- --------------------------------------------------------

--
-- Table structure for table `user_payments`
--

CREATE TABLE `user_payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `payment_number` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('Cash','Credit Card','Debit Card','UPI','Net Banking','Wallet') NOT NULL DEFAULT 'Cash',
  `status` enum('Pending','Completed','Failed','Refunded') NOT NULL DEFAULT 'Pending',
  `transaction_id` varchar(255) DEFAULT NULL,
  `gateway_response` varchar(255) DEFAULT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_payments`
--

INSERT INTO `user_payments` (`id`, `user_id`, `order_id`, `payment_number`, `amount`, `payment_method`, `status`, `transaction_id`, `gateway_response`, `payment_date`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'PAY2025090150C9EF', 2399.98, 'Debit Card', 'Failed', 'TXNE9B519CEE0', 'Payment processed successfully', '2025-08-08 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(2, 1, 1, 'PAY20250901767966', 1199.97, 'Debit Card', 'Refunded', 'TXNF10D9E952F', 'Payment processed successfully', '2025-08-12 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(3, 1, 3, 'PAY202509017989E4', 399.99, 'Credit Card', 'Completed', 'TXN25CA0D4862', NULL, '2025-08-14 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(4, 2, 4, 'PAY20250901DF74FD', 399.99, 'UPI', 'Completed', 'TXN08FE392CD9', NULL, '2025-08-21 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(5, 2, 5, 'PAY20250901853C3B', 2399.98, 'Wallet', 'Pending', 'TXNFD95C511D8', 'Payment processed successfully', '2025-08-18 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(6, 2, 6, 'PAY2025090120CD0E', 3599.97, 'Cash', 'Failed', 'TXNBA970AA391', NULL, '2025-08-11 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(7, 2, 8, 'PAY20250901FCA3CE', 599.99, 'Debit Card', 'Completed', 'TXNE1C73BA85F', NULL, '2025-08-27 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(8, 2, 7, 'PAY20250901929711', 2999.97, 'Cash', 'Failed', 'TXN6FF7DC658E', NULL, '2025-08-23 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(9, 3, 9, 'PAY20250901FED42A', 2399.98, 'Debit Card', 'Refunded', 'TXN2E0B7F1985', NULL, '2025-08-25 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(10, 3, 10, 'PAY2025090113AE99', 599.99, 'UPI', 'Refunded', 'TXN4D3B56E9EB', 'Payment processed successfully', '2025-08-03 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(11, 4, 11, 'PAY20250901C98606', 1199.99, 'Debit Card', 'Completed', 'TXN057EA2655D', NULL, '2025-08-11 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(12, 4, 12, 'PAY20250901EBD15F', 1999.98, 'Wallet', 'Refunded', 'TXND2207D9141', 'Payment processed successfully', '2025-08-20 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(13, 4, 13, 'PAY20250901B24489', 2399.98, 'Wallet', 'Completed', 'TXN24ABE88D21', 'Payment processed successfully', '2025-08-18 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(14, 4, 14, 'PAY202509011E07F0', 599.99, 'Wallet', 'Completed', 'TXN5D06B96014', NULL, '2025-08-25 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(15, 5, 15, 'PAY202509019EAC59', 1999.98, 'Net Banking', 'Refunded', 'TXN161DAE76D7', 'Payment processed successfully', '2025-08-24 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(16, 5, 16, 'PAY202509017F116A', 2999.97, 'Cash', 'Pending', 'TXN2AB7542A7B', 'Payment processed successfully', '2025-08-02 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(17, 6, 17, 'PAY20250901DF6B2C', 249.99, 'Debit Card', 'Pending', 'TXN06C3BD7CF8', 'Payment processed successfully', '2025-08-13 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(18, 6, 18, 'PAY202509019A17D0', 249.99, 'Cash', 'Failed', 'TXNEC6D828FAE', NULL, '2025-08-06 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(19, 6, 21, 'PAY20250901DCC95B', 3599.97, 'Cash', 'Pending', 'TXN4758BC5CAA', 'Payment processed successfully', '2025-08-10 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(20, 6, 19, 'PAY2025090115E1F7', 1999.98, 'Cash', 'Pending', 'TXN10017D3C37', 'Payment processed successfully', '2025-08-16 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(21, 6, 20, 'PAY202509012BD5ED', 399.99, 'Cash', 'Refunded', 'TXN75D7589F58', 'Payment processed successfully', '2025-08-27 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(22, 7, 22, 'PAY20250901EC13B0', 999.99, 'UPI', 'Completed', 'TXN5118D5E78D', NULL, '2025-08-08 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(23, 7, 23, 'PAY2025090181D5B8', 599.99, 'Wallet', 'Failed', 'TXN062231360C', NULL, '2025-08-19 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(24, 7, 24, 'PAY20250901500719', 3599.97, 'Cash', 'Pending', 'TXN85F4C98073', NULL, '2025-08-25 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(25, 8, 25, 'PAY202509014792CB', 1799.97, 'Wallet', 'Failed', 'TXN408546B6DC', 'Payment processed successfully', '2025-08-09 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(26, 8, 26, 'PAY20250901072FAB', 399.99, 'UPI', 'Pending', 'TXN4E671B20E0', 'Payment processed successfully', '2025-08-25 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(27, 8, 27, 'PAY202509013EB854', 1199.97, 'Credit Card', 'Refunded', 'TXN0D92336341', NULL, '2025-08-21 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(28, 9, 31, 'PAY20250901B45C44', 599.99, 'UPI', 'Pending', 'TXN11CD452450', 'Payment processed successfully', '2025-08-10 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(29, 9, 28, 'PAY2025090155A742', 599.99, 'Net Banking', 'Failed', 'TXN1C6577BFF7', 'Payment processed successfully', '2025-08-20 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(30, 9, 30, 'PAY20250901214B65', 1199.99, 'Net Banking', 'Failed', 'TXN7CC4579284', NULL, '2025-08-06 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(31, 9, 32, 'PAY202509014C2FBA', 1999.98, 'UPI', 'Completed', 'TXN50B2C55796', NULL, '2025-08-05 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(32, 9, 29, 'PAY202509010B9CBF', 1999.98, 'Credit Card', 'Completed', 'TXN286CA24191', 'Payment processed successfully', '2025-08-29 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(33, 10, 34, 'PAY20250901D73A5C', 399.99, 'Wallet', 'Failed', 'TXN4E270F07BC', NULL, '2025-08-08 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(34, 10, 33, 'PAY20250901D04D80', 1199.99, 'Debit Card', 'Pending', 'TXN03DF367381', 'Payment processed successfully', '2025-08-16 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(35, 10, 35, 'PAY20250901111223', 249.99, 'Wallet', 'Pending', 'TXN763673E3F2', NULL, '2025-08-08 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(36, 11, 37, 'PAY20250901742DD5', 2399.98, 'UPI', 'Completed', 'TXNB38FDB32F7', NULL, '2025-08-27 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(37, 11, 38, 'PAY20250901453483', 2999.97, 'Net Banking', 'Refunded', 'TXNF2D179A269', NULL, '2025-08-16 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(38, 11, 36, 'PAY20250901D4F73F', 1199.99, 'Wallet', 'Pending', 'TXN6D06A51273', NULL, '2025-08-22 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(39, 11, 39, 'PAY20250901775D9A', 1999.98, 'UPI', 'Refunded', 'TXNEADE3C82EC', NULL, '2025-08-17 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(40, 12, 41, 'PAY20250901E3E08D', 749.97, 'Wallet', 'Failed', 'TXN199A2A092B', NULL, '2025-08-29 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(41, 12, 42, 'PAY20250901084813', 1199.99, 'UPI', 'Failed', 'TXNE6B27149CF', 'Payment processed successfully', '2025-08-10 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(42, 12, 40, 'PAY202509017A38B5', 3599.97, 'Net Banking', 'Completed', 'TXNC81836ECF6', 'Payment processed successfully', '2025-08-05 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(43, 13, 43, 'PAY202509016C03FD', 1199.97, 'Debit Card', 'Failed', 'TXNF16B8AB791', 'Payment processed successfully', '2025-08-09 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(44, 13, 44, 'PAY20250901EB1D3E', 799.98, 'Net Banking', 'Failed', 'TXN20B5C54AC7', NULL, '2025-08-29 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(45, 13, 45, 'PAY202509013D1B75', 2399.98, 'Wallet', 'Refunded', 'TXN048A1DE330', 'Payment processed successfully', '2025-08-14 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(46, 13, 47, 'PAY2025090180915C', 1799.97, 'Credit Card', 'Refunded', 'TXN9C1367913A', NULL, '2025-08-09 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(47, 13, 46, 'PAY202509014EE85C', 499.98, 'UPI', 'Refunded', 'TXNA15B18A02E', 'Payment processed successfully', '2025-08-04 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(48, 14, 48, 'PAY2025090148D120', 599.99, 'Wallet', 'Pending', 'TXNC6A7683D03', NULL, '2025-08-04 00:24:45', 'Sample payment notes', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(49, 14, 49, 'PAY202509015DB858', 1199.98, 'UPI', 'Pending', 'TXNCAFDD5FFD5', NULL, '2025-08-11 00:24:45', NULL, '2025-09-01 00:24:46', '2025-09-01 00:24:46');

-- --------------------------------------------------------

--
-- Table structure for table `user_sites`
--

CREATE TABLE `user_sites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `site_name` varchar(255) NOT NULL,
  `site_url` varchar(255) NOT NULL,
  `badge_icon_url` varchar(255) DEFAULT NULL,
  `notification_icon_url` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive','Pending') NOT NULL DEFAULT 'Active',
  `is_connected` tinyint(1) NOT NULL DEFAULT 0,
  `clicks` int(11) NOT NULL DEFAULT 0,
  `conversions` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `welcome_pushes`
--

CREATE TABLE `welcome_pushes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `domain` varchar(255) NOT NULL DEFAULT 'all',
  `delay_seconds` varchar(255) NOT NULL DEFAULT 'Immediately',
  `image_url` varchar(255) DEFAULT NULL,
  `button_text` varchar(255) DEFAULT NULL,
  `button_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `you_tube_channels`
--

CREATE TABLE `you_tube_channels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL DEFAULT 'All',
  `subscriber_count` varchar(255) NOT NULL DEFAULT '0',
  `logo` varchar(255) DEFAULT NULL,
  `status` enum('Active','Paused') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `you_tube_channels`
--

INSERT INTO `you_tube_channels` (`id`, `user_id`, `title`, `domain`, `subscriber_count`, `logo`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'wwe', 'All', '50M', 'WWE', 'Active', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(2, 1, 'larapush', 'All', '10K', 'LP', 'Active', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(3, 1, 'ndtv', 'All', '25M', 'ND', 'Active', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(4, 1, 'invideoofficial', 'All', '2M', 'IV', 'Active', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(5, 1, 'kommuneindia', 'All', '500K', 'KI', 'Active', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(6, 1, 'watchcartvindia', 'All', '1M', 'WC', 'Active', '2025-09-01 00:24:46', '2025-09-01 00:24:46'),
(7, 1, 'rankknar', 'All', '100K', 'RK', 'Active', '2025-09-01 00:24:46', '2025-09-01 00:24:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attributes_tag_unique` (`tag`),
  ADD KEY `attributes_is_active_index` (`is_active`);

--
-- Indexes for table `automations`
--
ALTER TABLE `automations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `automations_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaigns_user_id_foreign` (`user_id`);

--
-- Indexes for table `domains`
--
ALTER TABLE `domains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lp_links`
--
ALTER TABLE `lp_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lp_links_user_id_status_index` (`user_id`,`status`),
  ADD KEY `lp_links_is_active_index` (`is_active`),
  ADD KEY `lp_links_type_reference_id_index` (`type`,`reference_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`),
  ADD KEY `orders_user_id_status_index` (`user_id`,`status`),
  ADD KEY `orders_order_number_index` (`order_number`),
  ADD KEY `orders_order_date_index` (`order_date`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `segmentation_rules`
--
ALTER TABLE `segmentation_rules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `segmentation_rules_user_id_foreign` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_payments`
--
ALTER TABLE `user_payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_payments_payment_number_unique` (`payment_number`),
  ADD KEY `user_payments_order_id_foreign` (`order_id`),
  ADD KEY `user_payments_user_id_status_index` (`user_id`,`status`),
  ADD KEY `user_payments_payment_number_index` (`payment_number`),
  ADD KEY `user_payments_transaction_id_index` (`transaction_id`),
  ADD KEY `user_payments_payment_date_index` (`payment_date`);

--
-- Indexes for table `user_sites`
--
ALTER TABLE `user_sites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_sites_user_id_status_index` (`user_id`,`status`),
  ADD KEY `user_sites_is_connected_index` (`is_connected`);

--
-- Indexes for table `welcome_pushes`
--
ALTER TABLE `welcome_pushes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `welcome_pushes_user_id_foreign` (`user_id`);

--
-- Indexes for table `you_tube_channels`
--
ALTER TABLE `you_tube_channels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `you_tube_channels_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `automations`
--
ALTER TABLE `automations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `domains`
--
ALTER TABLE `domains`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lp_links`
--
ALTER TABLE `lp_links`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `segmentation_rules`
--
ALTER TABLE `segmentation_rules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_payments`
--
ALTER TABLE `user_payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `user_sites`
--
ALTER TABLE `user_sites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `welcome_pushes`
--
ALTER TABLE `welcome_pushes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `you_tube_channels`
--
ALTER TABLE `you_tube_channels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `automations`
--
ALTER TABLE `automations`
  ADD CONSTRAINT `automations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD CONSTRAINT `campaigns_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `lp_links`
--
ALTER TABLE `lp_links`
  ADD CONSTRAINT `lp_links_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `segmentation_rules`
--
ALTER TABLE `segmentation_rules`
  ADD CONSTRAINT `segmentation_rules_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_payments`
--
ALTER TABLE `user_payments`
  ADD CONSTRAINT `user_payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `user_payments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_sites`
--
ALTER TABLE `user_sites`
  ADD CONSTRAINT `user_sites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `welcome_pushes`
--
ALTER TABLE `welcome_pushes`
  ADD CONSTRAINT `welcome_pushes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `you_tube_channels`
--
ALTER TABLE `you_tube_channels`
  ADD CONSTRAINT `you_tube_channels_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
