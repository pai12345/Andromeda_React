const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;
const GraphQL_API_Path = process.env.REACT_APP_GraphQL_API_Path;

const generateConfigurations = () => {
  return {
    ENCRYPTION_KEY: ENCRYPTION_KEY,
    GraphQL_API_Path: GraphQL_API_Path,
  };
};

export default generateConfigurations;
