import { FC } from 'react';
import '../../style/Home.scss'

const Home: FC = () => {

    return (
        <div className="home">
            <div className="header">
                <h1>ChatApp</h1>
            </div>
            <div className="home-info"> 
                <div className="home-info-des">
                    <h2>Join to us and write to friends</h2>
                    <div className="des">
                        <p>
                            Make groups, invite friends and meet new people!
                            Create free account and join to world. Everyone're waiting for you!
                        </p>
                    </div>
                    <button>Join</button>
                </div>
                <div className="home-galery">
                    <div className="galery-example"> </div>
                </div>
            </div>
        </div>
    );
}

export default Home;