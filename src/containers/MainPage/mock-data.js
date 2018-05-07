const minute = 60 * 1000;
const hour = minute * 60;
const day = hour * 24;
const now = Date.now();

export const dataArr = [
    {
        id: 1,
        author: "Иванова А. К.",
        avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        date: new Date(now - 17 * minute),
        treatmentDate: '13.10.2017',
        rate: 4,
    }, {
        id: 7,
        author: "Иванова А. К.",
        avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        date: new Date(now - 3 * hour),
        treatmentDate: '13.10.2017',
        rate: 4,
    }, {
        id: 8,
        author: "Иванова А. К.",
        avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        date: new Date(now - 9 * hour),
        treatmentDate: '13.09.2017',
        rate: 4,
    }, {
        id: 9,
        author: "Иванова А. К.",
        avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        date: new Date(now - 3 * day),
        treatmentDate: '13.09.2017',
        rate: 4,
    },
];

export const scheduleArr = [
    {
        name: "Иванова А. К.",
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        infoText: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        time: '08:15',
        type: 'chat1',
    }, {
        name: "Иванова А. К.",
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        infoText: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        time: '08:15',
        type: 'chat1',
    }, {
        name: "Иванова А. К.",
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        infoText: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        time: '08:15',
        type: 'chat1',
    }, {
        name: "Иванова А. К.",
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        infoText: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        time: '08:15',
        type: 'chat1',
    },{
        name: "Иванова А. К.",
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        infoText: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        time: '08:15',
        type: 'chat1',
    },
];

export const treatmentArr = [
    {
        name: "Иванова А. К.",
        date: "15.09.2017",
        time: '15:00-16:00',
        type: 'chat1',
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        diagnostic: "Сахарный диабет",
        comments: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        price: "112 руб.",
        conclusion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        conclusionDownload: "Заключение 252525.pdf",
        review: "Lorem ipsum dolor sit amet, consectetuer...",
    }, {
        name: "Иванова А. К.",
        date: "15.09.2017",
        time: '15:00-16:00',
        type: 'chat1',
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        diagnostic: "Сахарный диабет",
        comments: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        price: "112 руб.",
        conclusion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        conclusionDownload: "Заключение 252525.pdf",
        review: "Lorem ipsum dolor sit amet, consectetuer...",
    }, {
        name: "Иванова А. К.",
        date: "15.09.2017",
        time: '15:00-16:00',
        type: 'chat1',
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        diagnostic: "Сахарный диабет",
        comments: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        price: "112 руб.",
        conclusion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        conclusionDownload: "Заключение 252525.pdf",
        review: "Lorem ipsum dolor sit amet, consectetuer...",
    }, {
        name: "Иванова А. К.",
        date: "15.09.2017",
        time: '15:00-16:00',
        type: 'chat1',
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        diagnostic: "Сахарный диабет",
        comments: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        price: "112 руб.",
        conclusion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        conclusionDownload: "Заключение 252525.pdf",
        review: "Lorem ipsum dolor sit amet, consectetuer...",
    },{
        name: "Иванова А. К.",
        date: "15.09.2017",
        time: '15:00-16:00',
        type: 'chat1',
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        diagnostic: "Сахарный диабет",
        comments: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        price: "112 руб.",
        conclusion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        conclusionDownload: "Заключение 252525.pdf",
        review: "Lorem ipsum dolor sit amet, consectetuer...",
    },{
        name: "Иванова А. К.",
        date: "15.09.2017",
        time: '15:00-16:00',
        type: 'chat1',
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        diagnostic: "Сахарный диабет",
        comments: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        price: "112 руб.",
        conclusion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        conclusionDownload: "Заключение 252525.pdf",
        review: "Lorem ipsum dolor sit amet, consectetuer...",
    },{
        name: "Иванова А. К.",
        date: "15.09.2017",
        time: '15:00-16:00',
        type: 'chat1',
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        diagnostic: "Сахарный диабет",
        comments: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        price: "112 руб.",
        conclusion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        conclusionDownload: "Заключение 252525.pdf",
        review: "Lorem ipsum dolor sit amet, consectetuer...",
    },{
        name: "Иванова А. К.",
        date: "15.09.2017",
        time: '15:00-16:00',
        type: 'chat1',
        img: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
        diagnostic: "Сахарный диабет",
        comments: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        price: "112 руб.",
        conclusion: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        conclusionDownload: "Заключение 252525.pdf",
        review: "Lorem ipsum dolor sit amet, consectetuer...",
    },
];

export const panelArr = {
    receptionsToday: 15,
    receptionsActual: 7,
    patients: 24
};



// const data1 = {
//     author: "Иванова А. К.",
//     avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
//     text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
//     date: date1,
//     treatmentDate: '13.10.2017',
//     rate: 4,
// };
// const data2 = {
//     text: "Далеко-далеко. Максимально далеко и еще чуть-чуть дальше за словесными горами в стране гласных и согласных живут рыбные тексты. ",
//     date: date1,
//     secondary: true,
// };