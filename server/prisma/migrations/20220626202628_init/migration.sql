-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "user" VARCHAR(20) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "admin" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "team" INTEGER NOT NULL,
    "money" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_user_key" ON "Player"("user");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
