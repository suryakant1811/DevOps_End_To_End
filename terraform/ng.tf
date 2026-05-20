resource "aws_nat_gateway" "online_ng" {
    allocation_id = aws_eip.elasticIP.id
    subnet_id = aws_subnet.public_subnet_1.id
    depends_on = [ aws_internet_gateway.online_ig ]
    tags = {
        Name = "online_ng"
    }
}