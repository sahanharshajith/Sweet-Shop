import logo from './fluffy_delights_logo.png'
import cart_icon from './cart_icon.png'
import profile_icon from './profile_icon.png'
import menu_icon from './menu_icon.png'
import dropdown_icon from './dropdown_icon.png'
import hero_image from './hero_image.jpg'
import cakeImage from '../assets/cakeImage.avif';
import starSweetImage from '../assets/starSweetImage.avif'; 
import logoImage from '../assets/logoImage.jpg';
import citrusImage from '../assets/citrusImage.jpeg';
import profile from '../assets/profileicon.png';
import Kondakewm from '../assets/Konda kewm.jpg';
import Munkewum from '../assets/Mun kewum.png';
import Kokis from '../assets/Kokis.png';
import Athirasa from '../assets/Athirasa.png';
import Aasmee from '../assets/Aasmee.png';
import NaranKewm from '../assets/Naran Kewm.jpg';
import Aluva from '../assets/Aluva.png';
import KaluAggala from '../assets/Kalu Aggala.png';
import ButterCake from '../assets/Butter Cake.jpg';
import ButterIcingCake from '../assets/Butter Icing Cake.webp';
import ChocolateCake from '../assets/Chocolate Cake.webp';
import ChocolateCupCake from '../assets/Chocolate Cup Cake.jpg';
import ChocolateIcingCake from '../assets/Chocolate Icing Cake.jpg';
import CoconutCake from '../assets/Coconut Cake.png';
import RibbonCake from '../assets/Ribbon Cake.png';
import VanilaCupCake from '../assets/Vanila Cup Cake.jpg';
import MilkToffee from '../assets/Milk Tofee.webp';
import CoconutToffee from '../assets/Coconut Tofee.png';
import Boondi from '../assets/Boondi.png';
import Marshmallows from '../assets/Marshmallows.jpg';
import SeeniMurukku from '../assets/Seeni Murukku.png';
import SeeniPathuru from '../assets/Seeni Pathuru.png';
import Dodol from '../assets/Dodol.png';
import CashewDodol from '../assets/Dodol With Cashew.jpg';
import Halapa from '../assets/Halapa.webp';
import PeniWalalu from '../assets/Peni Walalu.jpg';
import RulanAluwa from '../assets/Rulan Aluwa.png';
import Thalaguli from '../assets/Thala guli.png';
import Thalakerali from '../assets/Thala kerali.jpg';
import Welithalapa from '../assets/Welithalapa.png';
import blueberryCheesecake from '../assets/No Bake Cheesecake Cup – blueberry.jpg';
import congratsBento from '../assets/Congrats Bento Bundle.webp';
import thankYouBento from '../assets/Thank You Bento Bundle.webp';
import HBDbento from '../assets/HBD Bento Bundle.jpeg';
import CakeTruffles from '../assets/Cake Truffles.webp';
import CakePops from '../assets/Cake Pops.webp';
import OriginalChocolate from '../assets/Original Chocolate.webp';
import OriginalVanilla from '../assets/Original Vanilla.webp';
import SignatureCake  from '../assets/Signature Chocolate Cake.webp';
import CookieCream from '../assets/Cookie & Cream.webp';
import RedVelvet from '../assets/Red Velvet.webp';
import PackofCupcakes from '../assets/12 Pack of Cupcakes.webp';

export const assets = {
    logo,
    cart_icon,
    profile_icon,
    menu_icon,
    dropdown_icon,
    hero_image,
    cakeImage,
    starSweetImage, 
    logoImage,
    citrusImage,
    profile
}

export const popularItems = [
    {
      id: 35,
      name: "Cake Truffles",
      price: 120,
      image: CakeTruffles,
    },
    {
      id: 36,
      name: "Cake Pops",
      price: 150,
      image: CakePops,
    },
    {
      id: 37,
      name: "Cake Pops",
      price: 250,
      image: OriginalChocolate,
    },
    {
      id: 38,
      name: "Original Vanilla",
      price: 250,
      image: OriginalVanilla,
    },
    {
      id: 39,
      name: "Signature Chocolate Cake",
      price: 2150,
      image: SignatureCake,
    },
    {
      id: 40,
      name: "Red Velvet",
      price: 300,
      image: RedVelvet,
    },
    {
      id: 41,
      name: "Cookie & Cream",
      price: 250,
      image: CookieCream,
    },
    {
      id: 42,
      name: "12 Pack of Cupcakes",
      price: 50,
      image: PackofCupcakes,
    },
];

export const bestSellingItems = [
    {
      id: 31,
      name: "Cheesecake Cup – blueberry",
      price: 790,
      image: blueberryCheesecake,
    },
    {
      id: 32,
      name: "Congrats Bento Bundle",
      price: 2750,
      image: congratsBento,
    },
    {
      id: 33,
      name: "Thank You Bento Bundle",
      price: 2750,
      image: thankYouBento,
    },
    {
      id: 34,
      name: "HBD Bento Bundle",
      price: 1750,
      image: HBDbento,
    },
];
  
export const menuItems = [
    {
      id: 1,
      name: "Konda kewum",
      price: 50,
      image: Kondakewm,
      category: "Local sweets",
    },
    {
      id: 2,
      name: "No Bake Cheesecake Cup – blueberry",
      price: 790,
      image: blueberryCheesecake,
      category: "Local sweets",
    },
    {
      id: 3,
      name: "Kokis",
      price: 30,
      image: Kokis,
      category: "Local sweets",
    },
    {
      id: 4,
      name: "Athirasa",
      price: 50,
      quantity: 1,
      image: Athirasa,
      category: "Local sweets",
      description: "Sweet made from rice flour and palm treacle"
    },
    {
      id: 5,
      name: "Aasmee",
      price: 130,
      quantity: 1,
      image: Aasmee,
      category: "Local sweets",
      description: "String hopper-like sweet with coconut milk"
    },
    {
      id: 6,
      name: "Naran Kewm",
      price: 50,
      quantity: 1,
      image: NaranKewm,
      category: "Local sweets",
      description: "Orange-flavored traditional sweet"
    },
    {
      id: 7,
      name: "Aluva",
      price: 50,
      quantity: 1,
      image: Aluva,
      category: "Local sweets",
      description: "Soft, chewy sweet made with rice flour"
    },
    {
      id: 8,
      name: "Kalu Aggala",
      price: 50,
      quantity: 1,
      image: KaluAggala,
      category: "Local sweets",
      description: "Black sweet balls made with finger millet"
    },
    {
        id: 9,
        name: "Butter Cake (1Kg)",
        price: 1600,
        quantity: 1,
        image: ButterCake,
        category: "Cakes"
    },
    {
        id: 10,
        name: "Ribbon Cake (1Kg)",
        price: 1750,
        quantity: 1,
        image: RibbonCake,
        category: "Cakes"
    },
    {
        id: 11,
        name: "Chocolate Cake (1kg)",
        price: 1950,
        quantity: 1,
        image: ChocolateCake,
        category: "Cakes"
    },
    {
        id: 12,
        name: "Coconut Cake (1kg)",
        price: 1450,
        quantity: 1,
        image: CoconutCake,
        category: "Cakes"
    },
    {
        id: 13,
        name: "Vanila Cup Cake",
        price: 150,
        quantity: 1,
        image: VanilaCupCake,
        category: "Cakes"
    },
    {
        id: 14,
        name: "Chocolate Cup cake",
        price: 180,
        quantity: 1,
        image: ChocolateCupCake,
        category: "Cakes"
    },
    {
        id: 15,
        name: "Butter Icing Cake (1Kg)",
        price: 3400,
        quantity: 1,
        image: ButterIcingCake,
        category: "Cakes"
    },
    {
        id: 16,
        name: "Chocolate Icing Cake (1kg)",
        price: 4400,
        quantity: 1,
        image: ChocolateIcingCake,
        category: "Cakes"
    },
    {
        id: 17,
        name: "Milk Toffee",
        price: 25,
        quantity: 1,
        image: MilkToffee,
        category: "Toffee"
    },
    {
        id: 18,
        name: "Coconut Tofee",
        price: 30,
        quantity: 1,
        image: CoconutToffee,
        category: "Toffee"
    },
    {
        id: 19,
        name: "Seeni Murukku (Packet)",
        price: 150,
        quantity: 1,
        image: SeeniMurukku,
        category: "Other"
    },
    {
        id: 20,
        name: "Boondi (1Kg)",
        price: 1200,
        quantity: 1,
        image: Boondi,
        category: "Other"
    },
    {
        id: 21,
        name: "Seeni Pathuru (Packet)",
        price: 150,
        quantity: 1,
        image: SeeniPathuru,
        category: "Other"
    },
    {
        id: 22,
        name: "Marshmallows",
        price: 20,
        quantity: 1,
        image: Marshmallows,
        category: "Other"
    },
    {
        id: 23,
        name: "Dodol(1Kg)",
        price: 1600,
        quantity: 1,
        image: Dodol,
        category: "Local sweets"
    },
    {
        id: 24,
        name: "Dodol With Cashew(1Kg)",
        price: 1950,
        quantity: 1,
        image: CashewDodol,
        category: "Local sweets"
    },
    {
        id: 25,
        name: "Halapa",
        price: 70,
        quantity: 1,
        image: Halapa,
        category: "Local sweets"
    },
    {
        id: 26,
        name: "Peni Walalu",
        price: 60,
        quantity: 1,
        image: PeniWalalu,
        category: "Local sweets"
    },
    {
        id: 27,
        name: "Rulan Aluwa",
        price: 50,
        quantity: 1,
        image: RulanAluwa,
        category: "Local sweets"
    },
    {
        id: 28,
        name: "Thalaguli",
        price: 50,
        quantity: 1,
        image: Thalaguli,
        category: "Local sweets"
    },
    {
        id: 29,
        name: "Thalakerali",
        price: 20,
        quantity: 1,
        image: Thalakerali,
        category: "Local sweets"
    },
    {
        id: 30,
        name: "Welithalapa",
        price: 60,
        quantity: 1,
        image: Welithalapa,
        category: "Local sweets"
    },

];
  
export const categories = [
    "All",
    "Cupcakes",
    "Cakes",
    "Desserts",
    "Cookies",
    "Other"
];
