import React from 'react';
// import './g6.css';
import G6 from '@antv/g6';

const G6Timebar = () => {    
    
    React.useEffect(() => {
        const data:any = {
            nodes: [],
            edges: [],
        };
          
        for (let i = 0; i < 100; i++) {
            const id = `node-${i}`;
            data.nodes.push({
                id,
                date: `2020${i}`,
                value: Math.round(Math.random() * 300),
            });
            
            data.edges.push({
                source: `node-${Math.round(Math.random() * 90)}`,
                target: `node-${Math.round(Math.random() * 90)}`,
            });
        }
                                  
        const width = window.innerWidth;
        const height = window.innerHeight;
        const timeBarData:any = [];
        
        const nodeSize = 20;
          
        for (let i = 0; i < 100; i++) {
            timeBarData.push({
                date: `2020${i}`,
                value: Math.round(Math.random() * 300),
            });
        }
          
        const timebar:any = new G6.TimeBar({
            x: 0,
            y: 0,
            width,
            height: 150,
            padding: 10,
            type: 'trend',
            trend: {
                data: timeBarData,
            },
        });
          
        // constrained the layout inside the area
        const constrainBox = { x: 10, y: 10, width: 580, height: 450 };
          
        const onTick = () => {
            let minx = 99999999;
            let maxx = -99999999;
            let miny = 99999999;
            let maxy = -99999999;            
            data.nodes.forEach((node:any) => {
                if (minx > node.x) {
                    minx = node.x;
                }
                if (maxx < node.x) {
                    maxx = node.x;
                }
                if (miny > node.y) {
                    miny = node.y;
                }
                if (maxy < node.y) {
                    maxy = node.y;
                }
            });
            const scalex = (constrainBox.width - nodeSize / 2) / (maxx - minx);
            const scaley = (constrainBox.height - nodeSize / 2) / (maxy - miny);
            data.nodes.forEach((node:any) => {
                node.x = (node.x - minx) * scalex + constrainBox.x;
                node.y = (node.y - miny) * scaley + constrainBox.y;
            });
        };
          
        const graph = new G6.Graph({
            container: 'g6_timeline',
            width,
            height,
            linkCenter: true,
            plugins: [timebar],
            layout: {
                type: 'gForce',
                preventOverlap: true,
                onTick,
            },
            defaultNode: {
                size: nodeSize,
                type: 'circle',
                style: {
                    fill: '#DEE9FF',
                    stroke: '#5B8FF9',
                },
            },
            modes: {
                default: ['drag-node'],
            },
        });
        graph.data(data);
        graph.render();
          
    }, [])

    return (
        <div id="g6_timeline"></div>
    );
}

export default G6Timebar;