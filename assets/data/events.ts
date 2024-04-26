import { Event } from "@/src/types";

const events:Event[] = [
  {
    id: 1,
    name: 'Corrida & VTT Nocturne de Rhisnes',
    date: '2023-03-15',
    type: 'running',
    image: require('../../assets/images/running.png'),
    participants: ['Carole'],
  },
  {
    id: 2,
    name: 'Anniversaire Loïc',
    date: '2023-10-19',
    type: 'anniversaire',
    image: require('../../assets/images/birthday.png'),
    participants: [],
  },
  {
    id: 3,
    name: 'Tri off PDO',
    date: '2023-04-21',
    type: 'event PDO',
    image: require('../../assets/images/pdo.png'),
    participants: ['Carole', 'JC', 'Loic'],
  },
  {
    id: 4,
    name: 'Semi-marathon Namur',
    date: '2023-04-07',
    type: 'running',
    image: require('../../assets/images/running.png'),
    participants: ['Carole', 'Ben', 'Loic'],
  },
  {
    id: 5,
    name: 'Mojo Gravel Tour',
    date: '2023-03-17',
    type: 'event PDO',
    image: require('../../assets/images/pdo.png'),
    participants: ['Carole'],
  },
  {
    id: 6,
    name: 'Triathlon Haute-Meuse DO',
    date: '2023-07-14',
    type: 'triathlon',
    image: require('../../assets/images/triathlon.png'),
    participants: ['Carole', 'Sophie'],
  },
];

export default events;