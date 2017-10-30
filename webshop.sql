-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2017 at 11:13 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `item_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'LIPS'),
(2, 'EYES'),
(3, 'FACE'),
(4, 'TOOLS');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `address` varchar(50) NOT NULL,
  `total` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `CreatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `email`, `address`, `total`, `user_id`, `CreatedOn`) VALUES
(8, 'maja@gmail.com', 'aaa', 50, 0, '2017-09-10 14:47:02'),
(9, 'pera@pera', 'pera', 50, 0, '2017-09-10 14:47:02'),
(10, 'laza@laza', 'aa', 50, 0, '2017-09-10 14:47:02'),
(11, 'laza@laza', 'aaa', 50, 0, '2017-09-10 14:47:02'),
(12, 'mja@la', 'a', 50, 0, '2017-09-10 14:47:02'),
(13, 'laza@laza', 'aaa', 50, 0, '2017-09-10 14:47:02'),
(14, 'majaantic994@gmail.com', 'kill bill', 50, 0, '2017-09-10 14:47:02'),
(15, 'laza@laza', 'zaza', 50, 0, '2017-09-10 14:47:02'),
(16, 'aza@aza', 'aaa', 50, 0, '2017-09-10 14:47:02'),
(17, 'majaantic994@gmail.com', 'aa', 50, 0, '2017-09-10 14:47:02'),
(18, 'maja@bb', 'cc', 110, 1, '2017-09-10 14:47:02'),
(19, 'la@com', 'nnn', 10, NULL, '2017-09-10 14:47:02'),
(20, 'maja@bb', 'Mije Kovacevica', 100, 1, '2017-09-11 11:16:03');

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `order_item_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`order_item_id`, `product_id`, `order_id`, `quantity`) VALUES
(5, 1, 8, 3),
(20, 14, 14, 14),
(37, 5, 19, 1),
(38, 5, 8, 2),
(39, 2, 18, 3),
(40, 1, 18, 3),
(42, 9, 20, 2),
(43, 1, 20, 2);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `short_desc` varchar(50) DEFAULT NULL,
  `long_desc` varchar(150) DEFAULT NULL,
  `sale` tinyint(1) NOT NULL DEFAULT '0',
  `salePrice` double DEFAULT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `short_desc`, `long_desc`, `sale`, `salePrice`, `subcategory_id`, `image`) VALUES
(1, 'Red Lips', 50, 'Enhance natural lip color beautifully!', 'Beautiful lipstick which is subtle enhancing natural lip color. This lipstick is paraben-free, fragrance free, allergen-free, and gluten free.', 1, 40, 1, 'images/product1.jpg'),
(2, 'Nude lips', 55, 'A neutral, pale beige with a hint of pink!', 'beautiful lipstick which is subtle enhancing natural lip color. This lipstick is paraben-free, fragrance free, allergen-free, and gluten free.', 0, 0, 1, 'images/product2.jpg'),
(3, 'Pink lipgloss', 75, 'High-impact metallic color!', 'Wrap your lips in high-impact metallic color!', 1, 60, 2, 'images/product3.jpg'),
(4, 'Red Lip Pencil', 12, 'Works with warm, rich berry lipsticks.', 'Red Lip Pencil is a rich berry pink color. Incredibly creamy and super smooth, this lip crayon will enhance lipsticks with berry undertones.', 0, 0, 3, 'images/product4.jpg'),
(5, 'Neutral Lip Pencil', 10, 'Suitable for lipsticks with pink undertones.', 'Neutral Lip Pencil is a subtle, salmon pink color. Incredibly creamy and super smooth, this lip crayon will enhance lip color.', 0, 0, 3, 'images/product5.jpg'),
(6, 'Warm Palette', 75, 'Highly pigmented and easy-to-blend formula!', 'Highly pigmented and easy-to-blend formula. The palette comes with a dual-side soft bristle brush for easy application.', 0, 0, 4, 'images/product6.jpg'),
(7, 'Cold Palette', 35, 'An eyeshadow palette with highly pigmented mattes.', 'For maximum payoff, use your finger to apply the creamy metals. Do not apply with an eyeshadow brush.', 0, 0, 4, 'images/product7.jpg'),
(9, 'Super Curling Mascara', 20, 'It\'s a roller for lashes!', 'The eye - opening Hook \'n\' Roll brush grabs, separates, lifts, and curls...while the instant curve - setting formula holds for 12 hours.', 0, 0, 6, 'images/product9.jpg'),
(10, 'Brush Set', 100, 'When it comes to flawless application!', 'Buff, blend, line and define with our Makeup Brush Set. For flawless aplication and perfect look!', 0, 0, 5, 'images/product10.jpg'),
(11, 'Light/Medium Foundation', 45, 'A new 24-Hour, full-coverage foundation!', 'Foundation that instantly blurs pores and fines lines and provides uninterrupted flawless wear that looks and feels just applied, all-day', 0, 0, 7, 'images/product11.jpg'),
(12, 'Dark Foundation', 45, 'A lightweight liquid foundation!', 'A lightweight liquid foundation that achieves a radiant, silky finish. Enjoy your flawless skin!', 0, 0, 7, 'images/product12.jpg'),
(13, 'Translucent Concealer', 35, 'Ideal for all skin types!', 'An award-winning concealer that provides medium-to-full, buildable coverage and corrects, contours, highlights, and perfects.', 0, 0, 8, 'images/product13.jpg'),
(14, 'Neutral Beige Powder', 70, 'A breakthrough multiuse formula', 'A breakthrough multiuse formula that can be applied as a foundation or setting powder.', 0, 0, 9, 'images/product14.jpg'),
(15, 'Golden Beige Powder', 70, 'Silky powder with a touch of sheer coverage.', ' cult-favorite and award-winning, silky powder with a touch of sheer coverage to set makeup for lasting wear.', 0, 0, 9, 'images/product15.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `stars` int(11) NOT NULL,
  `body` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `stars`, `body`, `author`, `product_id`) VALUES
(1, 5, 'Great product!', 'maja@gmail.com', 1),
(2, 4, 'Nice!', 'jelena@gmail.com', 2),
(3, 3, 'Not so good!', 'pera@pera.co', 1),
(4, 2, 'Baaaaad!!', 'jela@gmail.com', 5),
(6, 1, 'amazing lipstick!!!', 'user@gmail.com', 1),
(7, 3, 'bla bla', 'maja', 1),
(8, 2, 'nice', 'maja@gmail.com', 5),
(9, 3, 'cool', 'user@user', 3),
(11, 5, 'Awesome!', 'maja@gmail.com', 10),
(12, 4, 'Easy to blend with!', 'jelena@gmail.com', 10),
(13, 5, 'Feels really soft on your skin...', 'dragana@gmail.com', 10);

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `subcategory_id` int(11) NOT NULL,
  `subcategory_name` varchar(30) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`subcategory_id`, `subcategory_name`, `category_id`) VALUES
(1, 'Lipstick', 1),
(2, 'Lipgloss', 1),
(3, 'Lip pencils', 1),
(4, 'Eye shadows', 2),
(5, 'Brushes', 4),
(6, 'Mascaras', 2),
(7, 'Foundation', 3),
(8, 'Concealer', 3),
(9, 'Powder', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `isAdmin`) VALUES
(1, 'maja@gmail.com', 'maja', 0),
(20, 'admin@admin', 'admin', 1),
(22, '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist_item`
--

CREATE TABLE `wishlist_item` (
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wishlist_item`
--

INSERT INTO `wishlist_item` (`product_id`, `user_id`, `item_id`) VALUES
(3, 1, 21),
(1, 1, 22),
(2, 1, 23);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `product` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `subcategory_id` (`subcategory_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`subcategory_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `wishlist_item`
--
ALTER TABLE `wishlist_item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `wishlist_item`
--
ALTER TABLE `wishlist_item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`subcategory_id`) ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE;

--
-- Constraints for table `wishlist_item`
--
ALTER TABLE `wishlist_item`
  ADD CONSTRAINT `wishlist_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlist_item_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
