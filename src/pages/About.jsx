import '../pages/About.css'

export function About() {
    // Create an array to store the name, profile picture(s), and a short bio for each team member (8 total)
    // The hoverPic is what will appear when the user hovers over the first picture
    const teamInfo = [
        {
            name: 'Wesam Almubarak',
            pic: 'src/assets/wesamPfp.jpg',
            hoverPic: 'src/assets/wesamHover.jpg',
            bio: 'Project Owner/Manager',
        },
        {
            name: 'Eammon Anderson',
            pic: 'path/to/pic.jpg',
            hoverPic: 'src/assets/eammonHover.jpg',
            bio: 'Scrum Master',
        },
        {
            name: 'Gracie Anderson',
            pic: 'src/assets/GracieProfile.png',
            hoverPic: 'src/assets/gracieHover.jpg',
            bio: 'Dev Team: Backend',
        },
        {
            name: 'Blake Casto',
            pic: 'path/to/pic.jpg',
            hoverPic: 'src/assets/blakeHover.jpg',
            bio: 'Dev Team: Frontend',
        },
        {
            name: 'Kevin Agazie',
            pic: 'src/assets/KevinProfile.png',
            hoverPic: 'src/assets/kevinHover.jpg',
            bio: 'Dev Team: Backend',
        },
        {
            name: 'Cameron Hannay',
            pic: 'src/assets/CamProfile.png',
            hoverPic: 'src/assets/CamProfile.jpg',
            bio: 'Dev Team: Frontend',
        },
        {
            name: 'Kaylea Lantz',
            pic: 'src/assets/Kaylea Profile Pic.jpg',
            hoverPic: 'src/assets/kayleaHover.jpg',
            bio: 'Dev Team: Frontend',
        },
        {
            name: 'Mason Phillips',
            pic: 'src/assets/MasonProfile.png',
            hoverPic: 'src/assets/MasonFunnyPic.png',
            bio: 'Dev Team: Frontend',
        },
    ]

    return (
        // Text to be displayed on the About page
        // Map the info for each group member to display their name and profile picture
        <>
            {/* Main heading followed by description for the About page to describe what ClimaCloset is */}
            <h1>About ClimaCloset</h1>
            <p>
                Welcome to ClimaCloset, where deciding what to wear is made easy!
                ClimaCloset is all about finding you the perfect outfit to wear based
                on your ideal weather preferences as well as what types of clothing
                items that you own which are then stored in your personal closet. You
                can also choose your activity for the day to help 
                tune your generated outfit.
            </p>
        
            <h1>Meet the Dream Team</h1>
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
        </>
    )
}