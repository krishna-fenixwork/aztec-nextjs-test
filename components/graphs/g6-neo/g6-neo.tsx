import React, { useState, useRef, useEffect } from 'react';
import NeoVis from 'neovis.js';
import { NEO4JCONFIG } from '../../../config/neovis-config';
import './g6.module.css';
import G6 from '@antv/g6';
import LocationCity from '../../../public/organisations-1.svg';
const INICIAL_CYPHER = `MATCH (p:People)-[r:PART_OF]->(o:Organizations) RETURN p,o,r LIMIT 100`;
const vix = {
    width: '100%',
    height: '100vh',    
    overflow: 'hidden'    
}

const G6Neo = () => {
    const viz = useRef(null);  
    const g6Graph = useRef(null);  
    const zoomedNode = useRef('');
    const relations = 'PART_OF|INVESTED_INTO|INVESTMENT_OF|FUNDINGROUND_OF|NO_OF_EMPLOYEES';  
    // g6 test
    const [g6Nodes, setg6Nodes] = useState([]);
    const [g6Edges, setg6Edges] = useState([]);    

    useEffect(() => {        
        const vis = new NeoVis({
            container_id: "viz",
            initial_cypher: INICIAL_CYPHER,
            ...NEO4JCONFIG           
        });
        viz.current = vis;

        vis.registerOnEvent('completed', () => {            
            setNodesAndEdges();
        })

        vis.render();

        const minimap = new G6.Minimap({
            size: [ 100, 100 ],
            className: "minimap",
            type: 'delegate'
        });
                          
        const menu = new G6.Menu({
            offsetX: 10,
            offsetY: 20,
            itemTypes: ['node'],
            getContent(e, g6_graph) {
                const outDiv = document.createElement('div');
                outDiv.style.width = '180px';
                outDiv.innerHTML = `<ul>
                    <li>menu 1</li>
                    <li>menu 2</li>
                    <li>menu 3</li>
                    <li>menu 4</li>
                    <li>menu 5</li>
                    </ul>`
                return outDiv
            },
            handleMenuClick(target, item, _graph) {
                // console.log(target, item, _graph)
            },
        });                           

        let graph = new G6.Graph({
            container: 'mountNode',
            width: window.innerWidth,
            height: window.innerHeight,
            modes: {
                default: [ 
                    'drag-node', 'zoom-canvas', 'drag-canvas', 'collapse-expand-combo',
                    {
                        type: 'collapse-expand-group',
                        trigger: 'click',
                    },
                    {
                        type: 'tooltip',
                        formatText(model) {
                            const text = 'label: ' + model.label + '<br/> class: ' + model.class;
                            return text;
                        },
                        shouldUpdate: e => {return true;}
                    },
                    {
                        type: 'edge-tooltip',
                        formatText(model) {
                            const text = 'source: ' + model.source
                            + '<br/> target: ' + model.target
                            + '<br/> weight: ' + model.weight;
                            return text;
                        },
                        shouldUpdate: e => {
                            return true;
                        }
                    }
                ],
            },
            plugins: [ minimap, menu],            
            defaultNode: {
                labelCfg: {
                    position: 'bottom',
                    offset: 10,
                    style: {
                        fill: '#fff'
                    }
                },
                style: {
                    fill: 'none',
                    stroke: '#c14e34',
                    lineWidth: 1,
                },
                icon: {
                    show: true,
                    width: 25,
                    height: 25,
                    img: LocationCity, // The image url of the icon
                    
                },
            },
            defaultEdge: {
                labelCfg: {
                    style: {
                        fill: '#fff',
                        color: 'white'
                    },
                    autoRotate: true
                }
            },
            nodeStateStyles: {
                // The node style when the state 'hover' is true
                hover: {
                    fill: 'lightsteelblue',
                },
                // The node style when the state 'click' is true
                click: {
                    stroke: '#000',
                    lineWidth: 3,
                },
            },
            // The edge styles in different states
            edgeStateStyles: {
                // The edge style when the state 'click' is true
                click: {
                    stroke: 'steelblue',
                },
            },
            // Layout
            layout: {               
                type: 'gForce'
            },
        });        

        // events
        // Mouse enter a node
        graph.on('node:mouseenter', (e) => {
            const nodeItem = e.item; // Get the target item
            // console.log(e.item?._cfg?.id)
            zoomedNode.current = e.item?._cfg?.id;
            graph.setItemState(nodeItem, 'hover', true); // Set the state 'hover' of the item to be true
        });

        // Mouse leave a node
        graph.on('node:mouseleave', (e) => {
            const nodeItem = e.item; // Get the target item
            graph.setItemState(nodeItem, 'hover', false); // Set the state 'hover' of the item to be false
        });       

        // Click a node
        graph.on('node:click', (e) => {
            // Swich the 'click' state of the node to be false
            const clickNodes = graph.findAllByState('node', 'click');
            clickNodes.forEach((cn) => {
                graph.setItemState(cn, 'click', false);
            });
            const nodeItem = e.item; // et the clicked item
            graph.setItemState(nodeItem, 'click', true); // Set the state 'click' of the item to be true
            
        });

        // Click an edge
        graph.on('edge:click', (e) => {
            // Swich the 'click' state of the edge to be false
            const clickEdges = graph.findAllByState('edge', 'click');
            clickEdges.forEach((ce) => {
                graph.setItemState(ce, 'click', false);
            });
            const edgeItem = e.item; // Get the clicked item
            graph.setItemState(edgeItem, 'click', true); // Set the state 'click' of the item to be true
        });

        graph.on('wheelzoom', (e) => {
            e.stopPropagation();            
            const zoom = graph.getZoom().toFixed(1);            
            if(zoom === '1.5' && zoomedNode.current){
                onNodeAction('expand', zoomedNode.current);                             
            }else{
                console.log('no node.')
            }            
        });

        g6Graph.current = graph;
    }, [])                

    const setNodesAndEdges = () => {
        const nodes = [];
        const edges = [];
        // const timelineData = [];
        let allNodes = g6Nodes;
        let allEdges = g6Edges;        
        console.log(viz.current['_nodes']);
        for (const obj in viz.current['_nodes']) {
            const element = viz.current['_nodes'][obj];
            nodes.push({
                id: element.id.toString(),  
                // date: element.id.toString(),               
                // value: 3,             
                label: element.label
            })                      
            // timelineData.push({
            //     date: element.id.toString(),               
            //     value: 3
            // })  
        }
        console.log(viz.current['_edges']);
        
        for (const obj in viz.current['_edges']) {
            const element = viz.current['_edges'][obj];
            edges.push({
                source: element.from.toString(),
                target: element.to.toString()
            })
        }
       
        if(g6Nodes.length === 0 && g6Edges.length === 0){
            setg6Nodes(nodes);
            setg6Edges(edges);            
            g6Graph.current.data({
                nodes,
                edges
            });            
            g6Graph.current.render();
            
        }else{
            const nodesLength = allNodes.length;
            const edgesLength = allEdges.length;
            allNodes = [...allNodes, ...allNodes.slice(nodesLength)]
            allEdges = [...allEdges, ...allEdges.slice(edgesLength)]
            setg6Nodes(allNodes);
            setg6Edges(allEdges);            
            g6Graph.current.changeData({
                nodes: allNodes,
                edges: allEdges
            });
        }
        zoomedNode.current = null;
        
        // const timebarPlugin = new G6.TimeBar({
        //     x: 0,
        //     y: 0,
        //     width: window.innerHeight,
        //     height: 150,
        //     padding: 10,
        //     type: 'trend',
        //     trend: {
        //         data: timelineData,
        //     },
        // });
        // g6Graph.current.addPlugin(timebarPlugin)
    }

    const onNodeAction = (action_type, nodeId) => {        
        if(viz.current["_nodes"][nodeId]){
            const uuid = viz.current["_nodes"][nodeId].raw.properties.uuid;
            const node_label = viz.current["_nodes"][nodeId]?.raw?.labels[0];                    
            if(action_type !== 'collapse'){
                if(['Organizations', 'FundingRounds', 'Investments'].includes(node_label)){
                   
                    const queryRelations = relations ? `r:${relations}` : 'r'
                    const q1 = `MATCH (n:${node_label} {uuid: '${uuid}'})-[${queryRelations}]-(b) RETURN r, n, b LIMIT 20`;                            
                    viz.current.updateWithCypher(q1)                   
                }
            }        
        }else{
            console.log('not a node id!')
        }
    }

    return (
        <div id="g6-neo-container">
            <div className="d-none">
                <div id="viz" style={vix}></div>
            </div>
            <div className="g6Test">
                <div>
                    <div id="mountNode"></div>
                </div>                
            </div>
        </div>
    );
}

export default G6Neo;