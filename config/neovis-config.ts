const neo4jUri = 'bolt://neo4j.aztec-innovation-hub.com';
const pass = 'panic-greek-guitar-compact-orca-3903';
const WHITE_FONT = {
    size:16,
    color:"#ffffff",
    strokeWidth: 0,
    strokeColor: 'transparent'
}
const COMMON_SIZE = 2.5;
const RELATIONSHIP_OPTIONS = {
    "thickness": "weight",
    "caption": false,                            
}

export const NEO4JCONFIG = {    
    server_url: neo4jUri,
    server_user: 'neo4j',
    server_password: pass,
    encrypted: 'ENCRYPTION_ON', 
    trust: 'TRUST_SYSTEM_CA_SIGNED_CERTIFICATES',
    server_database: 'test',
    labels: {
        "Organizations": {
            "caption": "name",                    
            "size": "total_funding",            
            "font": {
                size:16,
                color:"#59c681",
                strokeWidth: 0,
                strokeColor: 'transparent'
            },                        
        },              
        "Investments": {
            "caption": "name",                                
            "font": WHITE_FONT,                   
            "size": 6.5
        },
        "FundingRounds": {
            "caption": "name",              
            "font": WHITE_FONT,                    
            "size": 3.0
        },
        "People": {
            "caption": "name",                    
            "font": WHITE_FONT,            
            "size": 1.5
        },  
        "NoOfEmployees": {
            "caption": "name",              
            "font": WHITE_FONT,                    
            "size": 3.5,
        },
        "Acquisitions": {
            "caption": "name",                               
            "font": WHITE_FONT,                    
            "size": 2.0,
        },
        "Category": {
            "caption": "catName",                               
            "font": WHITE_FONT,                    
            "size": COMMON_SIZE
        },
        "RootCategory": {
            "caption": "catName",                               
            "font": WHITE_FONT,                    
            "size": COMMON_SIZE
        },
        "Industries": {
            "caption": "name",                               
            "font": WHITE_FONT,                    
            "size": COMMON_SIZE
        },
        "Page": {
            "caption": "pageTitle",                               
            "font": WHITE_FONT,                    
            "size": COMMON_SIZE
        },
        "See More": {
            "caption": "name",                               
            "font": WHITE_FONT,                    
            "size": COMMON_SIZE
        },
    },
    relationships: {
        "PART_OF": RELATIONSHIP_OPTIONS,
        "INVESTMENT_OF": RELATIONSHIP_OPTIONS,
        "INVESTED_INTO": RELATIONSHIP_OPTIONS,
        "FUNDINGROUND_INVESTMENTS": RELATIONSHIP_OPTIONS,
        "FUNDINGROUND_OF": RELATIONSHIP_OPTIONS,
        "ACQUIRED_BY": RELATIONSHIP_OPTIONS,
        "NO_OF_EMPLOYEES": RELATIONSHIP_OPTIONS,
        "ACQUISITION_OF": RELATIONSHIP_OPTIONS,
        "BELONGS_TO": RELATIONSHIP_OPTIONS,
        "SIMILARITY": RELATIONSHIP_OPTIONS,
        "INDUSTRIES": RELATIONSHIP_OPTIONS,
        "SUBCAT_OF": RELATIONSHIP_OPTIONS,
        "IN_CATEGORY": RELATIONSHIP_OPTIONS,
        "SEE_MORE": RELATIONSHIP_OPTIONS
    },
             
};
