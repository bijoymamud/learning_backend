-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "slogan" TEXT NOT NULL,
    "company_location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "number_of_employees" INTEGER NOT NULL,
    "about" TEXT NOT NULL,
    "website_url" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
