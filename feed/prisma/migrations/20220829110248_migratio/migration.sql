-- DropForeignKey
ALTER TABLE `feed` DROP FOREIGN KEY `feed_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `feed` DROP FOREIGN KEY `feed_user_id_fkey`;

-- AlterTable
ALTER TABLE `feed` MODIFY `user_id` VARCHAR(191) NULL,
    MODIFY `post_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `feed` ADD CONSTRAINT `feed_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feed` ADD CONSTRAINT `feed_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
