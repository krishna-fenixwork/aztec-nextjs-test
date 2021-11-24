import G2 from '../public/g2.png';

const trendData = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
];
export const TestData = {
    nodes: [
        {id: 'Tripod', type: '', is_company: true},
        {id: 'Laura', type: '', has_chart: true, trendData, style: {
      fill: '#e6f7ff',
    },},
        {id: 'Xenia', type: '', has_chart: true, trendData, style: {
      fill: '#e6f7ff',
    },},
        {id: 'Mellisa', type: '',            
            style : {
                keyshape: {
                    size: 30,
                    stroke: '#1a94db'
                },
                icon: {
                    type: 'image',
                    value: G2,
                    size: [20, 20],
                    clip: {
                        r: 10,
                    },
                    fill: '#000000',
                    stroke: '#1a94db',
                },
            }},
        {id: 'Sergo', type: '', style : {
            keyshape: {
                size: 30,
                stroke: '#1a94db'
            },
            icon: {
                type: 'image',
                value: G2,
                size: [20, 20],
                clip: {
                    r: 10,
                },
                fill: '#000000',
                stroke: '#1a94db',
            },
        }},
    ],
    edges: [
        {source: 'Tripod', target: 'Laura', value: 1},
        {source: 'Tripod', target: 'Xenia', value: 1},
        {source: 'Tripod', target: 'Mellisa', value: 1},
        {source: 'Tripod', target: 'Sergo', value: 1},
    ]
};