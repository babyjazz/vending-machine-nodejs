-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('failure', 'success', 'insufficient_balance', 'out_of_stock');

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "user_id" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "status" "order_status",
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "price" INTEGER NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR,
    "password" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "one" INTEGER NOT NULL DEFAULT 0,
    "five" INTEGER NOT NULL DEFAULT 0,
    "ten" INTEGER NOT NULL DEFAULT 0,
    "twenty" INTEGER NOT NULL DEFAULT 0,
    "fifty" INTEGER NOT NULL DEFAULT 0,
    "hundred" INTEGER NOT NULL DEFAULT 0,
    "five_hundred" INTEGER NOT NULL DEFAULT 0,
    "thousand" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_coins" (
    "id" SERIAL NOT NULL,
    "one" INTEGER NOT NULL DEFAULT 0,
    "five" INTEGER NOT NULL DEFAULT 0,
    "ten" INTEGER NOT NULL DEFAULT 0,
    "twenty" INTEGER NOT NULL DEFAULT 0,
    "fifty" INTEGER NOT NULL DEFAULT 0,
    "hundred" INTEGER NOT NULL DEFAULT 0,
    "five_hundred" INTEGER NOT NULL DEFAULT 0,
    "thousand" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "available_coins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
