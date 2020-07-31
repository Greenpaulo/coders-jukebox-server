import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../../lib/withApollo';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router'
import VideoItem from '../../components/VideoItem';



const Profile = () => {
  const router = useRouter()
  const { userId } = router.query

  const USER_QUERY = gql`
    query UserQuery{
      user(id:"${userId}") {
        firstName,
        lastName,
        _id,
        ownedVideos {
          thumbnailURL,
          title,
          videoURL
        },
        playlistComments{
          content
        }
      }
    }
  `;

  const { loading, data } = useQuery(USER_QUERY);

  if (loading || !data) {
    return <h1>loading...</h1>;
  }

  // const renderAddToPlayList = () => {
  //   if (data.user._id === )
  // }

  return (
    <Layout>
      <div className="container">
        <section id="user-info">
          <h2>{data.user.firstName} {data.user.lastName}</h2>
        </section>

        <section id="playlist">
          <h2>Playlist</h2>
          {data.user.ownedVideos.map(video => (
            <VideoItem video={video} />
          ))}
        </section>

        {/* {renderAddToPlayList} */}
      </div>



        <style jsx>{`
        
          #user-info {
            margin-top: 2rem
          }
          
          
          #playlist {
            margin-top: 4rem;
          }
        
        `}</style>

    </Layout>
  )
}

export default withApollo(Profile);