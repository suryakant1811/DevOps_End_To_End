resource "aws_subnet" "private_subnet_1" {
    vpc_id = aws_vpc.store_vpc.id
    cidr_block = "10.0.3.0/24"
    availability_zone = "ap-south-1a"

    tags = {
        Name = "private_subnet_1"
    }

}

resource "aws_subnet" "private_subnet_2" {
    vpc_id = aws_vpc.store_vpc.id
    cidr_block = "10.0.4.0/24"
    availability_zone = "ap-south-1b"

    tags = {
        Name = "private_subnet_2"
    }
}