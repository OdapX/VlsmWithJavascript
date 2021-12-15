// major_network : put the major network u need to subnet
// subnets : You need to fill the name and the number of hosts needed for each one .
//NOTE : u need to put the subnets in order of hosts ,subnet of big host number first then the next etc..
//the subnets automatic ordering will be added soon .

let major_network = "172.16.192.0";
let CIDR_major = "20";
const subnets = [
  {
    name: "A",
    hosts: 600,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
    premier_adress: "",
    defusion: "",
    last_adress: "",
  },
  {
    name: "B",
    hosts: 400,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
    premier_adress: "",
    defusion: "",
    last_adress: "",
  },
  {
    name: "C",
    hosts: 250,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
    premier_adress: "",
    defusion: "",
    last_adress: "",
  },
  {
    name: "D",
    hosts: 200,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
    premier_adress: "",
    defusion: "",
    last_adress: "",
  },
  {
    name: "E",
    hosts: 40,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
    premier_adress: "",
    defusion: "",
    last_adress: "",
  },
  {
    name: "F",
    hosts: 2,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
    premier_adress: "",
    defusion: "",
    last_adress: "",
  },
  {
    name: "G",
    hosts: 2,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
    premier_adress: "",
    defusion: "",
    last_adress: "",
  },
  {
    name: "H",
    hosts: 2,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
    premier_adress: "",
    defusion: "",
    last_adress: "",
  },
  {
    name: "I",
    hosts: 2,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
    premier_adress: "",
    defusion: "",
    last_adress: "",
  },
  {
    name: "J",
    hosts: 2,
    Twopower: "",
    CIDR: "",
    Mask_decimal: "",
    adr_reseau: "",
    premier_adress: "",
    defusion: "",
    last_adress: "",
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
    decimal_mask.slice(0, -1);
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

  adr_list[adr_list.length - j] =
    parseInt(adr_list[adr_list.length - j]) + PowerTwo;

  adress_resaux = "";
  adr_list.forEach((e) => {
    adress_resaux = adress_resaux + e + ".";
  });

  adress_resaux = adress_resaux.slice(0, -1);

  return adress_resaux;
}

function fill_premier_adress(subnets) {
  subnets.forEach((subnet) => {
    adress = subnet.adr_reseau.split(".");
    adress[3] = (parseInt(adress[3]) + 1).toString();
    PremierAdr = "";
    adress.forEach((e) => {
      PremierAdr = PremierAdr + e + ".";
    });
    PremierAdr = PremierAdr.slice(0, -1);
    subnet.premier_adress = PremierAdr;
  });
}

function fill_deffusion(subnets) {
  for (let i = 0; i < subnets.length - 1; i++) {
    Adress_parts = subnets[i + 1].adr_reseau.split(".");
    defusion_Adress = "";

    //In this part we are looking for the first byte not equal to 0 so we can
    //substract 1 to get the broadcat adress
    // we can't substract from a 0 byte we jump to the next byte

    //although it looks confusing it's not
    // if last byte ==0 jump to next byte => if it's also 0 jump to the next ... we substract -1 from
    //the first byte we find not equal zero
    //also each time we jump a zero byte we set it to 255

    if (Adress_parts[3] == 0) {
      Adress_parts[3] = "255";
      //The byte before the last
      if (Adress_parts[2] == 0) {
        Adress_parts[2] = "255";
        //The second byte  in the network adress
        if (Adress_parts[1] == 0) {
          Adress_parts[1] = "255";
          Adress_parts[0] = (parseInt(Adress_parts[0]) - 1).toString();
          Adress_parts.forEach((e) => {
            defusion_Adress = defusion_Adress + e + ".";
          });
          defusion_Adress = defusion_Adress.slice(0, -1);
          subnets[i].defusion = defusion_Adress;
        } else {
          Adress_parts[1] = (parseInt(Adress_parts[1]) - 1).toString();
          Adress_parts.forEach((e) => {
            defusion_Adress = defusion_Adress + e + ".";
          });
          defusion_Adress = defusion_Adress.slice(0, -1);
          subnets[i].defusion = defusion_Adress;
        }
      } else {
        Adress_parts[2] = (parseInt(Adress_parts[2]) - 1).toString();
        Adress_parts.forEach((e) => {
          defusion_Adress = defusion_Adress + e + ".";
        });
        defusion_Adress = defusion_Adress.slice(0, -1);
        subnets[i].defusion = defusion_Adress;
      }
    } else {
      Adress_parts[3] = (parseInt(Adress_parts[3]) - 1).toString();
      Adress_parts.forEach((e) => {
        defusion_Adress = defusion_Adress + e + ".";
      });
      defusion_Adress = defusion_Adress.slice(0, -1);
      subnets[i].defusion = defusion_Adress;
    }
  }
}

//last adress = broadcat adress -1
function fill_last_adress(subnets) {
  subnets.forEach((subnet) => {
    parts = subnet.defusion.split(".");
    parts[3] = (parseInt(parts[3]) - 1).toString();
    last_Adress = "";
    parts.forEach((e) => {
      last_Adress = last_Adress + e + ".";
    });
    last_Adress = last_Adress.slice(0, -1);
    subnet.last_adress = last_Adress;
  });
}

Mask_FINDER(subnets);
subnet_adress(subnets);
fill_premier_adress(subnets);
fill_deffusion(subnets);
fill_last_adress(subnets);
console.log(subnets);
