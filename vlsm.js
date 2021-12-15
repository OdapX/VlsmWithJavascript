let major_network = "192.168.1.0";
let CIDR_major = "24";
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
    adr_reseau: "",
  },
  {
    name: "C",
    hosts: 30,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
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

function subnet_adress(subnets) {
  subnets[0].adr_reseau = major_network;
  for (let i = 1; i < subnets.length; i++) {
    subnets[i].adr_reseau = add_adr(
      subnets[i - 1].Twopower,
      subnets[i - 1].adr_reseau
    );
  }
}

//this function is used to add the ip adress to a power of two
// the problem is that the addition should be done to the index
// resulting from successive division by 2^8 (=1byte)
//so it's better to have an independent function taking care of that

function add_adr(twopower, adr_reseau) {
  PowerTwo = 2 ** twopower;
  j = 1;

  while (PowerTwo % 2 ** 8 == 0) {
    PowerTwo = PowerTwo / 2 ** 8;
    j = j + 1;
  }

  adr_list = adr_reseau.split(".");
  console.log(adr_list);
  adr_list[adr_list.length - j] =
    parseInt(adr_list[adr_list.length - j]) + PowerTwo;

  adress_resaux = "";
  adr_list.forEach((e) => {
    adress_resaux = adress_resaux + e + ".";
  });

  adress_resaux = adress_resaux.slice(0, -1);

  return adress_resaux;
}

Mask_FINDER(subnets);
subnet_adress(subnets);
console.log(subnets);
