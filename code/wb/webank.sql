/*
 Navicat Premium Data Transfer

 Source Server         : mysq
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : webank

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 24/03/2023 14:38:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for orderheader
-- ----------------------------
DROP TABLE IF EXISTS `orderheader`;
CREATE TABLE `orderheader`  (
  `order_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单头id',
  `order_user_id` int(11) NULL DEFAULT NULL COMMENT 'userid关联',
  `order_time` datetime(0) NULL DEFAULT NULL COMMENT '提交时间',
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `orderUserId`(`order_user_id`) USING BTREE,
  INDEX `orderId`(`order_id`) USING BTREE,
  INDEX `orderId_2`(`order_id`) USING BTREE,
  CONSTRAINT `orderheader_ibfk_1` FOREIGN KEY (`order_user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orderheader
-- ----------------------------
INSERT INTO `orderheader` VALUES (1, 1, '2023-03-07 09:14:21');
INSERT INTO `orderheader` VALUES (2, 2, '2023-03-07 09:14:58');
INSERT INTO `orderheader` VALUES (3, 1, '2023-03-07 09:15:08');
INSERT INTO `orderheader` VALUES (4, 1, '2023-03-07 15:37:01');
INSERT INTO `orderheader` VALUES (5, 1, '2023-03-07 16:18:59');
INSERT INTO `orderheader` VALUES (6, 1, '2023-03-07 16:34:41');
INSERT INTO `orderheader` VALUES (7, 2, '2023-03-07 16:42:47');
INSERT INTO `orderheader` VALUES (8, 2, '2023-03-07 16:46:52');
INSERT INTO `orderheader` VALUES (9, 1, '2023-03-07 17:47:26');
INSERT INTO `orderheader` VALUES (10, 4, '2023-03-10 18:13:11');
INSERT INTO `orderheader` VALUES (11, 4, '2023-03-10 18:13:16');
INSERT INTO `orderheader` VALUES (12, 4, '2023-03-10 18:13:25');
INSERT INTO `orderheader` VALUES (13, 4, '2023-03-10 18:13:30');
INSERT INTO `orderheader` VALUES (14, 4, '2023-03-10 18:13:39');
INSERT INTO `orderheader` VALUES (15, 4, '2023-03-10 18:13:51');
INSERT INTO `orderheader` VALUES (39, 5, '2023-03-14 09:32:13');
INSERT INTO `orderheader` VALUES (40, 5, '2023-03-14 09:55:28');
INSERT INTO `orderheader` VALUES (41, 5, '2023-03-14 10:08:18');
INSERT INTO `orderheader` VALUES (42, 5, '2023-03-14 10:11:59');
INSERT INTO `orderheader` VALUES (43, 5, '2023-03-14 19:12:11');
INSERT INTO `orderheader` VALUES (44, 5, '2023-03-14 19:46:46');

-- ----------------------------
-- Table structure for orderitem
-- ----------------------------
DROP TABLE IF EXISTS `orderitem`;
CREATE TABLE `orderitem`  (
  `order_item_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单尾id',
  `order_hader_id` int(11) NULL DEFAULT NULL COMMENT '关联订单头',
  `order_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '题',
  `order_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '答案',
  PRIMARY KEY (`order_item_id`) USING BTREE,
  INDEX `order_hader_id`(`order_hader_id`) USING BTREE,
  CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`order_hader_id`) REFERENCES `orderheader` (`order_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 113 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orderitem
-- ----------------------------
INSERT INTO `orderitem` VALUES (1, 1, '为啥梨好吃', '好吃');
INSERT INTO `orderitem` VALUES (2, 1, '为啥香蕉好吃', '好吃');
INSERT INTO `orderitem` VALUES (3, 2, '为啥橘子好吃', '好吃');
INSERT INTO `orderitem` VALUES (4, 1, '为啥大枣好吃', '好吃');
INSERT INTO `orderitem` VALUES (5, 2, '为啥橙子好吃', '好吃');
INSERT INTO `orderitem` VALUES (6, 1, '为啥葡萄好吃', '好吃');
INSERT INTO `orderitem` VALUES (7, 4, '为啥苹果好吃', '好吃');
INSERT INTO `orderitem` VALUES (8, 7, 'sadfs', '吃不吃');
INSERT INTO `orderitem` VALUES (9, 1, 'sgerg', '吃不吃');
INSERT INTO `orderitem` VALUES (10, 1, 'erterterg', '吃不吃');
INSERT INTO `orderitem` VALUES (14, 3, 'sadfs', '吃不吃');
INSERT INTO `orderitem` VALUES (15, 5, 'sgerg', '吃不吃');
INSERT INTO `orderitem` VALUES (16, 8, 'erterterg', '吃不吃');
INSERT INTO `orderitem` VALUES (17, 6, 'sadfs', '吃不吃');
INSERT INTO `orderitem` VALUES (18, 9, 'sgerg', '吃不吃');
INSERT INTO `orderitem` VALUES (19, 9, 'erterterg', '吃不吃');
INSERT INTO `orderitem` VALUES (20, 10, '1', '1');
INSERT INTO `orderitem` VALUES (21, 11, '小猫爱吃啥', '鱼');
INSERT INTO `orderitem` VALUES (22, 12, '小狗爱吃啥', '骨头');
INSERT INTO `orderitem` VALUES (23, 13, '乌龟爱吃啥', '不到');
INSERT INTO `orderitem` VALUES (24, 14, '鱼爱吃啥', '不到');
INSERT INTO `orderitem` VALUES (25, 15, '猴子爱吃啥', '香蕉');
INSERT INTO `orderitem` VALUES (26, 11, '大象爱吃啥', '不到');
INSERT INTO `orderitem` VALUES (27, 12, '老虎爱吃啥', '不到');
INSERT INTO `orderitem` VALUES (28, 13, '狮子爱吃啥', '不到');
INSERT INTO `orderitem` VALUES (29, 14, '猎豹爱吃啥', '不到');
INSERT INTO `orderitem` VALUES (30, 15, '鳄鱼爱吃啥', '不到');
INSERT INTO `orderitem` VALUES (49, 41, '为啥梨好吃', '2');
INSERT INTO `orderitem` VALUES (50, 41, '为啥香蕉好吃', '2');
INSERT INTO `orderitem` VALUES (51, 41, '为啥橘子好吃', '2');
INSERT INTO `orderitem` VALUES (52, 41, '为啥大枣好吃', '2');
INSERT INTO `orderitem` VALUES (53, 41, '为啥橙子好吃', '2');
INSERT INTO `orderitem` VALUES (54, 41, '为啥葡萄好吃', '2');
INSERT INTO `orderitem` VALUES (55, 41, '为啥苹果好吃', '2');
INSERT INTO `orderitem` VALUES (56, 41, '为啥提子好吃', '2');
INSERT INTO `orderitem` VALUES (57, 41, '为啥菠萝好吃', '2');
INSERT INTO `orderitem` VALUES (58, 41, '为啥葡萄干好吃', '2');
INSERT INTO `orderitem` VALUES (59, 41, '为啥瓜子好吃', '2');
INSERT INTO `orderitem` VALUES (60, 41, '谁通过多个', '2');
INSERT INTO `orderitem` VALUES (61, 41, '让她4444444gb', '2');
INSERT INTO `orderitem` VALUES (62, 41, '阿特烦人白天太热TV', '2');
INSERT INTO `orderitem` VALUES (63, 41, '如让他', '2');
INSERT INTO `orderitem` VALUES (64, 42, '为啥梨好吃', '2');
INSERT INTO `orderitem` VALUES (65, 42, '为啥香蕉好吃', '2');
INSERT INTO `orderitem` VALUES (66, 42, '为啥橘子好吃', '2');
INSERT INTO `orderitem` VALUES (67, 42, '为啥大枣好吃', '2');
INSERT INTO `orderitem` VALUES (68, 42, '为啥橙子好吃', '2');
INSERT INTO `orderitem` VALUES (69, 42, '为啥葡萄好吃', '2');
INSERT INTO `orderitem` VALUES (70, 42, '为啥苹果好吃', '2');
INSERT INTO `orderitem` VALUES (71, 42, '为啥提子好吃', '2');
INSERT INTO `orderitem` VALUES (72, 42, '为啥菠萝好吃', '2');
INSERT INTO `orderitem` VALUES (73, 42, '为啥葡萄干好吃', '2');
INSERT INTO `orderitem` VALUES (74, 42, '为啥瓜子好吃', '2');
INSERT INTO `orderitem` VALUES (75, 42, '谁通过多个', '2');
INSERT INTO `orderitem` VALUES (76, 42, '让她4444444gb', '2');
INSERT INTO `orderitem` VALUES (77, 42, '阿特烦人白天太热TV', '2');
INSERT INTO `orderitem` VALUES (78, 42, '如让他', '2');
INSERT INTO `orderitem` VALUES (79, 43, '为啥梨好吃', '1');
INSERT INTO `orderitem` VALUES (80, 43, '为啥香蕉好吃', '1');
INSERT INTO `orderitem` VALUES (81, 43, '为啥橘子好吃', '1');
INSERT INTO `orderitem` VALUES (82, 43, '为啥大枣好吃', '1');
INSERT INTO `orderitem` VALUES (83, 43, '为啥橙子好吃', '1');
INSERT INTO `orderitem` VALUES (84, 43, '为啥葡萄好吃', '1');
INSERT INTO `orderitem` VALUES (85, 43, '为啥苹果好吃', '1');
INSERT INTO `orderitem` VALUES (86, 43, '为啥提子好吃', '1');
INSERT INTO `orderitem` VALUES (87, 43, '为啥菠萝好吃', '1');
INSERT INTO `orderitem` VALUES (88, 43, '为啥葡萄干好吃', '1');
INSERT INTO `orderitem` VALUES (89, 43, '为啥瓜子好吃', '1');
INSERT INTO `orderitem` VALUES (90, 43, '谁通过多个', '1');
INSERT INTO `orderitem` VALUES (91, 43, '让她4444444gb', '1');
INSERT INTO `orderitem` VALUES (92, 43, '阿特烦人白天太热TV', '1');
INSERT INTO `orderitem` VALUES (93, 43, '如让他', '1');
INSERT INTO `orderitem` VALUES (94, 43, '444', '1');
INSERT INTO `orderitem` VALUES (95, 43, '44555', '1');
INSERT INTO `orderitem` VALUES (96, 44, '为啥梨好吃', '22');
INSERT INTO `orderitem` VALUES (97, 44, '为啥香蕉好吃', '22');
INSERT INTO `orderitem` VALUES (98, 44, '为啥橘子好吃', '22');
INSERT INTO `orderitem` VALUES (99, 44, '为啥大枣好吃', '22');
INSERT INTO `orderitem` VALUES (100, 44, '为啥橙子好吃', '22');
INSERT INTO `orderitem` VALUES (101, 44, '为啥葡萄好吃', '22');
INSERT INTO `orderitem` VALUES (102, 44, '为啥苹果好吃', '22');
INSERT INTO `orderitem` VALUES (103, 44, '为啥提子好吃', '22');
INSERT INTO `orderitem` VALUES (104, 44, '为啥菠萝好吃', '22');
INSERT INTO `orderitem` VALUES (105, 44, '为啥葡萄干好吃', '22');
INSERT INTO `orderitem` VALUES (106, 44, '为啥瓜子好吃', '22');
INSERT INTO `orderitem` VALUES (107, 44, '谁通过多个', '22');
INSERT INTO `orderitem` VALUES (108, 44, '让她4444444gb', '22');
INSERT INTO `orderitem` VALUES (109, 44, '阿特烦人白天太热TV', '22');
INSERT INTO `orderitem` VALUES (110, 44, '如让他', '22');
INSERT INTO `orderitem` VALUES (111, 44, '444', '22');
INSERT INTO `orderitem` VALUES (112, 44, '44555', '22');

-- ----------------------------
-- Table structure for title
-- ----------------------------
DROP TABLE IF EXISTS `title`;
CREATE TABLE `title`  (
  `title_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '题',
  `title_pen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '出的题',
  `title_answer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '答案',
  `title_remarks` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `title_census` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '统计1,input; 2,单选',
  PRIMARY KEY (`title_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of title
-- ----------------------------
INSERT INTO `title` VALUES (1, '为啥梨好吃', '', '好好想想', '1');
INSERT INTO `title` VALUES (2, '为啥香蕉好吃', '', '', '1');
INSERT INTO `title` VALUES (3, '为啥橘子好吃', '是，否', '', '3');
INSERT INTO `title` VALUES (4, '为啥大枣好吃', '12期，24期，36期', '好好想想', '3');
INSERT INTO `title` VALUES (5, '为啥橙子好吃', '高中及以下，大专，本科，硕士，博士，其他', '好好想想', '2');
INSERT INTO `title` VALUES (6, '为啥葡萄好吃', '已婚，未婚，离异，丧偶，其他', '', '3');
INSERT INTO `title` VALUES (7, '为啥苹果好吃', '先息后本，等额本金，随借随还', '', '2');
INSERT INTO `title` VALUES (8, '为啥提子好吃', '', '好好想想', '1');
INSERT INTO `title` VALUES (9, '为啥菠萝好吃', '是，否', '', '2');
INSERT INTO `title` VALUES (10, '为啥葡萄干好吃', '', '好好想想', '1');
INSERT INTO `title` VALUES (13, '为啥瓜子好吃', '是，否', '', '2');
INSERT INTO `title` VALUES (57, '今天帅不帅', '帅，丑', '好好考虑', '3');
INSERT INTO `title` VALUES (69, '123', '3543', '', '2');
INSERT INTO `title` VALUES (70, '今天帅不帅', '帅，丑', '好好考虑', '3');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '员工信息id',
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '员工姓名',
  `account` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录账号',
  `password` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录密码',
  `limits` int(11) NULL DEFAULT NULL COMMENT '权限',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '阿飞', '123456', '123456', 1);
INSERT INTO `user` VALUES (2, '阿萨', '654321', '654321', 2);
INSERT INTO `user` VALUES (3, '24', '123213212', '1312321', 2);
INSERT INTO `user` VALUES (4, '阿达', '321321', '321321', 1);
INSERT INTO `user` VALUES (5, '小刚', '123123', '123123', 2);
INSERT INTO `user` VALUES (6, '6', '6', '666666', 2);
INSERT INTO `user` VALUES (7, '佩奇', '999999', '888888', 1);
INSERT INTO `user` VALUES (8, '小猪', '222222', '111111', 2);
INSERT INTO `user` VALUES (9, '2323', '23', '222222', 2);
INSERT INTO `user` VALUES (10, '123', '123', '444444', 2);

SET FOREIGN_KEY_CHECKS = 1;
