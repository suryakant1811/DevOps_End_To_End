resource "aws_s3_bucket" "store_bucket" {
  bucket = "surya-s3-bucket-online-store"
}

resource "aws_s3_bucket_versioning" "name" {
    bucket = aws_s3_bucket.online_bucket.id
    versioning_configuration {
        status = "Enabled"
    }
}

resource "aws_dynamodb_table" "store_table" {
    name = "surya-dynamodb_table"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "LockID"

    attribute {
      name = "LockID"
      type = "s"
    }
}