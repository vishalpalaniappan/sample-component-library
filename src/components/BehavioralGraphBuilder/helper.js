
/**
 * Converts a DAL design specification object into nodes and edges for reaflow.
 * @param {Object} engine - The engine instance containing the design specification.
 * @returns {Object} An object containing nodes and edges for React Flow
 */
export const designToNodes = (engine) => {
    let edges = [];
    let nodes = [];

    for (let i = 0; i < engine.graph.nodes.length; i++) {
        const node = engine.graph.nodes[i];

        // This is hardcoded for now for the text "inv"
        // I will make this dynamic later, it should not
        // be hardcoded.
        let color = "#2b2c3e"
        let strokeColor =  '#43516a';
        if (node.getBehavior().getName().includes("inv")) {
            color = "#151516";
            strokeColor = "#252525";
        }
        nodes.push({    
            id: node.getBehavior().getName(),
            text: node.getBehavior().getName(),
            data: {
                color: color,
                borderColor: strokeColor
            }
        });
    }
    
    for (let i = 0; i < engine.graph.nodes.length; i++) {
        const node = engine.graph.nodes[i];
        if (!node?.getGoToBehaviors()) {
            continue;
        }

        node.getGoToBehaviors().forEach((goTo) => {
            edges.push({
                id: `${node.getBehavior().getName()}->${goTo}`,
                from: node.getBehavior().getName(),
                to: goTo,
            });
        });
    }

    return {
        nodes: nodes,
        edges: edges
    };
}