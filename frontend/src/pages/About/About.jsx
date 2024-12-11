import { CenterContainer } from '../../components/CenterContainer/CenterContainer'
import { TransparentBox } from '../../components/TransparentBox/TransparentBox'
import './About.css'

export function About() {
    // Create an array to store the name, profile picture(s), and a short bio for each team member (8 total)
    // The hoverPic is what will appear when the user hovers over the first picture
    const teamInfo = [
        {
            name: 'Wesam Almubarak',
            pic: 'frontend/src/assets/pfp/WesamGrad.JPG',
            hoverPic: 'frontend/src/assets/pfp/wesamPfp.jpg',
            bio: `Project Owner/Manager & Backend`,
        },
        {
            name: 'Eammon Anderson',
            pic: 'frontend/src/assets/pfp/EammonProfile1.png',
            hoverPic: 'frontend/src/assets/pfp/EammonProfile2.png',
            bio: 'Scrum Master',
        },
        {
            name: 'Gracie Anderson',
            pic: 'frontend/src/assets/pfp/GracieProfile.png',
            hoverPic: 'frontend/src/assets/pfp/GracieHover.JPG',
            bio: 'Dev Team: Backend',
        },
        {
            name: 'Blake Casto',
            pic: 'frontend/src/assets/pfp/BlakeProfile.jpg',
            hoverPic: 'frontend/src/assets/pfp/BlakeHover.jpg',
            bio: 'Dev Team: Frontend',
        },
        {
            name: 'Kevin Agazie',
            pic: 'frontend/src/assets/pfp/KevinProfile.png',
            hoverPic: 'frontend/src/assets/pfp/KevinProfileGoofyAhh.png',
            bio: 'Dev Team: Web App Deployment',
        },
        {
            name: 'Cameron Hannay',
            pic: 'frontend/src/assets/pfp/CamProfile.png',
            hoverPic: 'frontend/src/assets/pfp/CamProfile.jpg',
            bio: 'Dev Team: Front & Backend',
        },
        {
            name: 'Kaylea Lantz',
            pic: 'frontend/src/assets/pfp/2024-Kaylea Lantz - EE-1436.jpg',
            hoverPic: 'frontend/src/assets/pfp/Kaylea Profile Pic.jpg',
            bio: 'Dev Team: Front & Backend',
        },
        {
            name: 'Mason Phillips',
            pic: 'frontend/src/assets/pfp/MasonProfile.png',
            hoverPic: 'frontend/src/assets/pfp/MasonFunnyPic.png',
            bio: 'Dev Team: Front & Backend',
        },
    ]

    return (
        // Text to be displayed on the About page
        // Map the info for each group member to display their name and profile picture
        <>
            <CenterContainer>
            {/* Main heading followed by description for the About page to describe what ClimaCloset is */}
            <h1>About ClimaCloset</h1>
            <TransparentBox style={{width: "80%"}}>
                <p>
                    Welcome to ClimaCloset, where deciding what to wear is made easy!
                    ClimaCloset is all about finding you the perfect outfit to wear based
                    on your ideal weather preferences as well as what types of clothing
                    items that you own which are then stored in your personal closet. You
                    can also choose your activity for the day to help 
                    tune your generated outfit.
                </p>
            </TransparentBox>
        
            <h1>Meet the Dream Team</h1>
            
            <TransparentBox style={{width: "80%"}}>
                <div className="group-members">
                    {/* Map through each group member and display their corresponding info */}
                    {teamInfo.map((member, index) => (
                        <div key={index} className="group-member">
                            {/* Group member's name */}
                            <h2 className="member-name">{member.name}</h2>
                            {/* Profile pictures (original & hovered) */}
                            <div className="images-hovering">
                                <img src={member.pic} alt={`Profile Pic`} className="profile-pic" />
                                <img src={member.hoverPic} alt={`Funny Pic`} className="hover-pic" />
                            </div>
                            {/* Group member's short bio*/}
                            <h3 className="member-bio">{member.bio}</h3>
                        </div>
                    ))}
                </div>
            </TransparentBox>
            </CenterContainer>
        </>
    )
}