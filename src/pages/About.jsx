import '../pages/About.css'

export function About() {
    // Create an array to store the name and profile picture for each team member
    const teamInfo = [
        {
            name: 'Wesam Almubarak',
            pic: 'src/assets/wesamPfp.jpg',
            bio: 'Project Owner/Manager',
        },
        {
            name: 'Eammon Anderson',
            pic: 'path/to/pic.jpg',
            bio: 'Scrum Master',
        },
        {
            name: 'Gracie Anderson',
            pic: 'src/assets/GracieProfile.png',
            bio: 'Dev Team: Backend',
        },
        {
            name: 'Blake Casto',
            pic: 'path/to/pic.jpg',
            bio: 'Dev Team: Frontend',
        },
        {
            name: 'Kevin Agazie',
            pic: 'src/assets/KevinProfile.png',
            bio: 'Dev Team: Backend',
        },
        {
            name: 'Cameron Hannay',
            pic: 'src/assets/CamProfile.jpg',
            bio: 'Dev Team: Frontend',
        },
        {
            name: 'Kaylea Lantz',
            pic: 'src/assets/Kaylea Profile Pic.jpg',
            bio: 'Dev Team: Frontend',
        },
        {
            name: 'Mason Phillips',
            pic: 'src/assets/MasonProfile.png',
            bio: 'Dev Team: Frontend',
        },
    ]

    return (
        // Text to be displayed on the About page
        // Map the info for each group member to display their name and profile picture
        <>
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
                {teamInfo.map((member, index) => (
                    <div key={index} className="group-member">
                        <h2 className="member-name">{member.name}</h2>
                        <img src={member.pic} alt={`Profile Pic`} className="profile-pic" />
                        <h3 className="member-bio">{member.bio}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}