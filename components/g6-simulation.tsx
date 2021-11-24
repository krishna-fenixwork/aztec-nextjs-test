import React from 'react';
import G6 from '@antv/g6';
import LocationCity from '../pages/aseets/group_2787.png';

const G6Simulation = ({macroFactor, trends}) => {

    const g6Graph = React.useRef(null); 
    
    React.useEffect(() => {
        let data = [];
        if (macroFactor && trends) {                        
            const mapedTrends = macroFactor.map((item) => item?.macro_trend)
            data = [...trends, ...mapedTrends];            
        }      
      
        let graph = new G6.Graph({
            container: 'mountNode',
            width: 360,
            height: 250,          
            defaultEdge: {
                style: {
                    stroke: '#fff',
                    strokeOpacity: 0.5                                        
                },
                labelCfg: {
                    style: {
                        fill: '#fff',
                        color: 'white'
                    },
                    autoRotate: true
                }
            },           
            // Layout
            layout: {
                // type: 'gForce',
                // linkDistance: 100,
                // preventOverlap: true,
                // nodeStrength: -30,
                // edgeStrength: 0.1,
                type: 'gForce',        
            },
        });

        graph.on('node:mouseenter', (evt) => {
            const { item } = evt;
            const model = item.getModel();
            const currentLabel = model.label;
            // model.oriFontSize = model.labelCfg.style.fontSize;
            item.update({
                label: model.oriLabel,
            });
            model.oriLabel = currentLabel;
            graph.setItemState(item, 'hover', true);
            item.toFront();
        });

        graph.on('node:mouseleave', (evt) => {
            const { item } = evt;
            const model = item.getModel();
            const currentLabel = model.label;
            item.update({
              label: model.oriLabel,
            });
            model.oriLabel = currentLabel;
            // graph.setItemState(item, 'hover', false);
        });

        g6Graph.current = graph;
        setNodesAndEdges(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formatText = (text, length = 5, elipsis = '...') => {
        if (!text) return '';
        if (text.length > length) {
          return `${text.substr(0, length)}${elipsis}`;
        }
        return text;
    };


    const setNodesAndEdges = (data) => {
        let nodes = [
            {
                id: 'root',
                x: 150,
                y: 125,
                img: LocationCity,
                type: 'image',
                size: 50,
                clipCfg: {
                    show: true,
                    type: 'circle',
                    // r: 15
                }   
                // icon: {
                //     show: true,
                //     width: 25,
                //     height: 25,
                //     img: LocationCity, // The image url of the icon                    
                // },             
            }            
        ];
        let edges = [];
        data.forEach((item) => {
            nodes.push({
                id: item,
                oriLabel: item,
                label: formatText(item, 5, '...'),
                labelCfg: {
                    position: 'center',                    
                    offset: 10,
                    style: {
                        fill: '#fff',
                        opacity: 0.5
                    }
                },
                style: {
                    opacity: 0
                }
            })
            edges.push({
                source: 'root',
                target: item
            })
        })
           
        g6Graph.current.data({ nodes, edges });
        g6Graph.current.render();
    }


    return (
        <div>
            <div>
                <div id="mountNode"></div>
            </div>
        </div>
    )
}

export default G6Simulation;