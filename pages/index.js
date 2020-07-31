import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
// import { getDataFromTree } from '@apollo/react-ssr';
import Layout from '../components/Layout';

const VIDEOS_QUERY = gql`
  query VideosQuery{
    videos {
      title
    }
  }
`;

const Index = () => {
  const { loading, data } = useQuery(VIDEOS_QUERY);

  if (loading || !data) {
    return <h1>loading...</h1>;
  }
  return (
    <Layout>
      <h1>Home</h1>
      <div className="container">
        {data.videos.map(video => (
          <h3 key={video.id}>{video.title}</h3>
        ))}
      </div>

    </Layout>
  )
};

export default withApollo(Index);

// You can also override the configs for withApollo here, so if you want
// this page to have SSR (and to be a lambda) for SEO purposes and remove
// the loading state, uncomment the import at the beginning and this:
//
// export default withApollo(Index, { getDataFromTree });