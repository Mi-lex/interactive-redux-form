type Row = {
    name: string;
    id: number;
    type: string;
    manager: string;
    client: string;
    organization: string;
    createdAt: string;
    finishedAt: string;
};

type Data = Row[];

export const data: Data = [
    {
        id: 1,
        name: 'Нихао Москва Пекин',
        type: 'Меню',
        manager: 'Иванов',
        client: 'Эффект',
        organization: 'ПрессЦентр',
        createdAt: '02.07.20',
        finishedAt: '04.07.20',
    },
    {
        id: 2,
        name: 'Котята',
        type: 'Календарь',
        manager: 'Пупкин',
        client: 'Видомедиа',
        organization: 'Наличные',
        createdAt: '02.07.20',
        finishedAt: '04.07.20',
    },
    {
        id: 3,
        name: 'Портрет Жукова',
        type: 'Банер',
        manager: 'Пупкина',
        client: 'Русал',
        organization: 'Эталон',
        createdAt: '07.07.20',
        finishedAt: '10.07.20',
    },
    {
        id: 4,
        name: 'Белые ночи',
        type: 'Табличка',
        manager: 'Никулин',
        client: 'Новатэк',
        organization: 'Стандарт',
        createdAt: '08.07.20',
        finishedAt: '09.07.20',
    },
    {
        id: 5,
        name: 'Осторожно злая собака',
        type: 'Табличка',
        manager: 'Кузько',
        client: 'Евраз',
        organization: 'Эталон',
        createdAt: '08.07.20',
        finishedAt: '11.09.20',
    },
    {
        id: 6,
        name: 'Северное сияние',
        type: 'визитка',
        manager: 'Гречкина',
        client: 'Тайна',
        organization: 'ПрессЦентр',
        createdAt: '05.08.20',
        finishedAt: '10.08.20',
    },
    {
        id: 7,
        name: 'Спорткар',
        type: 'Обложка',
        manager: 'Кузько',
        client: 'Клаус',
        organization: 'Наличные',
        createdAt: '02.09.20',
        finishedAt: '24.09.20',
    },
    {
        id: 8,
        name: 'Мадагаскар',
        type: 'Карта',
        manager: 'Иванов',
        client: 'Светлячок',
        organization: 'Стандарт',
        createdAt: '07.10.20',
        finishedAt: '25.11.20',
    },
];
