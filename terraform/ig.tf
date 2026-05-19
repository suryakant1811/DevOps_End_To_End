resource "aws_internet_gateway" "online_ig" {
    vpc_id = aws_vpc.store_vpc.id

    tags = {
        Name = "online_ig"
    }
}
