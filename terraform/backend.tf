terraform {
    backend "s3" {
        bucket = "surya-s3-bucket-online-store"
        dynamodb_table = "surya-dynamodb_table"
        region = "ap-south-1"
        key = "terraform.tfstate"
    }
}