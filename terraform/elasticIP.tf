resource "aws_eip" "elasticIP" {
    domain = vpc
    tags = {
        Name = "elasticIP"
    }
}

