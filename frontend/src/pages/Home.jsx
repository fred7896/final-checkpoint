import React from 'react';

import Navbar from '../components/Navbar';

class Home extends React.Component {
    render() {
        return (
            <div class="container-fluid home ">
                <Navbar />
            <div className="container-history p-3">Home</div>
            </div>
        )
    }
}

export default Home;