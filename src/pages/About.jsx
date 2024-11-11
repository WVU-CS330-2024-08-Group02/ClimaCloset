export function About() {
    // Create an array to store the name and profile picture for each team member
    const teamInfo = [
        {
            name: 'Wesam Almubarak',
            pic: 'path/to/pic.jpg',
        },
        {
            name: 'Eammon Anderson',
            pic: 'path/to/pic.jpg',
        },
        {
            name: 'Gracie Anderson',
            pic: 'path/to/pic.jpg',
        },
        {
            name: 'Blake Casto',
            pic: 'path/to/pic.jpg',
        },
        {
            name: 'Kevin Agazie',
            pic: 'path/to/pic.jpg',
        },
        {
            name: 'Cameron Hannay',
            pic: 'path/to/pic.jpg',
        },
        {
            name: 'Kaylea Lantz',
            pic: 'path/to/pic.jpg',
        },
        {
            name: 'Mason Phillips',
            pic: 'path/to/pic.jpg',
        },
    ]

    return (
        // Text to be displayed on the About page
        // Map the info for each group member to display their name and profile picture
        <>
            <h1>About ClimaCloset</h1>
            <p>
                Welcome to ClimaCloset, where deciding what to wear is made easy!
            </p>

            <h1>Meet our Team</h1>
            <div className="group-members">
                {teamInfo.map((member, index) => (
                    <div key={index} className="group-member">
                        <img src={member.photo} alt={`${member.name}'s Profile`} className="profile-pic" />
                        <h2>{member.name}</h2>
                    </div>
                ))}
            </div>
        </>
    )
}