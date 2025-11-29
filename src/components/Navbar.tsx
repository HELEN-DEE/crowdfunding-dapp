import React from 'react'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Create Campaign', path: '/create-campaign' },
    { name: 'My Campaigns', path: '/my-campaigns' },
    { name: 'Profile', path: '/profile' },
];

const Navbar = () => {
  return (
    <section>
        <h1>
            Crowdfunding Marketplace
        </h1>
        <nav>
            <ul>
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <a href={link.path}>{link.name}</a>
                    </li>
                ))}
            </ul>
        </nav>

    </section>
  )
}

export default Navbar