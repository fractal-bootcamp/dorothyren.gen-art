-- CreateEnum
CREATE TYPE "ArtType" AS ENUM ('BG', 'VERTEX');

-- AlterTable
ALTER TABLE "Art" ADD COLUMN     "type" "ArtType" NOT NULL DEFAULT 'BG',
ADD COLUMN     "vertexLineColor" TEXT,
ADD COLUMN     "vertexNodeColor" TEXT,
ADD COLUMN     "vertexNodes" INTEGER,
ALTER COLUMN "bgColor" DROP NOT NULL;
