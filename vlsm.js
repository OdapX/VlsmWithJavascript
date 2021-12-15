let major_network = "192.168.1.0/24";
const subnets = [
  {
    name: "A",
    hosts: 60,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
  },
  {
    name: "B",
    hosts: 30,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    dr_reseau: "",
  },
  {
    name: "C",
    hosts: 30,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    dr_reseau: "",
  },
];

// we need to find the closest 2 power to the number
//of hosts needed by the subnetwork

function find_two_power(subnets) {
  subnets.forEach((subnet) => {
    for (let i = 0; i <= 10; i++) {
      if (subnet.hosts <= Math.pow(2, i) - 2) {
        subnet.Twopower = i;
        break;
      }
    }
  });
}

function Mask_FINDER(subnets) {
  find_two_power(subnets);
  subnets.forEach((subnet) => {
    cidr = 32 - subnet.Twopower;
    binary_mask = "";
    decimal_mask = "";

    for (let i = 1; i <= cidr; i++) {
      binary_mask += "1";
    }

    for (let i = 0; i < subnet.Twopower; i++) {
      binary_mask += "0";
    }

    for (let i = 1; i <= 32; i++) {
      if (i % 8 == 0) {
        temp_slice = binary_mask.slice(i - 8, i);
        decimal_mask = decimal_mask + parseInt(temp_slice, 2).toString() + ".";
      }
    }
    subnet.CIDR = cidr;
    subnet.Mask_decimal = decimal_mask;
  });
}

function subnet_adress(subnets) {}

Mask_FINDER(subnets);
console.log(subnets);
