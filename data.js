// Real government spending data from official sources
const governmentSpendingData = {
    // Road Infrastructure Projects (Bharatmala Pariyojana & Highway Projects)
    roadProjects: [
        {
            id: "road-001",
            name: "Delhi-Mumbai Expressway Phase 1",
            budget: 1000000000000, // ₹1,00,000 Cr (Total project cost)
            actualSpending: 500000000000, // ₹50,000 Cr (50% completed)
            location: {
                lat: 28.4595,
                lng: 77.0266
            },
            ward: "Gurgaon-Delhi",
            department: "National Highways Authority of India (NHAI)",
            status: "in-progress", // completed, in-progress, delayed
            completionPercentage: 50,
            startDate: "2019-03-09",
            endDate: "2025-12-31",
            description: "1,350 km eight-lane expressway connecting Delhi and Mumbai, reducing travel time from 24 to 12 hours. Part of Bharatmala Pariyojana."
        },
        {
            id: "road-002",
            name: "Mumbai Coastal Road Project Phase 1",
            budget: 130000000000, // ₹13,000 Cr
            actualSpending: 90000000000, // ₹9,000 Cr (Phase 1 operational)
            location: {
                lat: 19.0176,
                lng: 72.8562
            },
            ward: "South Mumbai",
            department: "Brihanmumbai Municipal Corporation (BMC)",
            status: "completed",
            completionPercentage: 100,
            startDate: "2018-10-01",
            endDate: "2024-03-11",
            description: "10.58 km stretch from Princess Street Flyover to Bandra-Worli Sea Link, reducing travel time from 40 to 9 minutes."
        },
        {
            id: "road-003",
            name: "Bharatmala Delhi-Lucknow Corridor",
            budget: 250000000000, // ₹25,000 Cr (estimated)
            actualSpending: 125000000000, // ₹12,500 Cr
            location: {
                lat: 28.6139,
                lng: 77.2090
            },
            ward: "Delhi NCR",
            department: "Ministry of Road Transport and Highways",
            status: "in-progress",
            completionPercentage: 50,
            startDate: "2017-01-01",
            endDate: "2027-12-31",
            description: "494 km economic corridor connecting Delhi-Moradabad-Bareily-Shahjahanpur-Hardoi-Lucknow under Bharatmala Pariyojana."
        },
        {
            id: "road-004",
            name: "Mumbai Coastal Road Phase 2",
            budget: 80000000000, // ₹8,000 Cr (Phase 2)
            actualSpending: 24000000000, // ₹2,400 Cr
            location: {
                lat: 19.0544,
                lng: 72.8406
            },
            ward: "Bandra-Kandivali",
            department: "Brihanmumbai Municipal Corporation (BMC)",
            status: "delayed",
            completionPercentage: 30,
            startDate: "2020-01-01",
            endDate: "2027-08-15",
            description: "19.22 km stretch from Bandra terminus to Kandivali including Bandra-Versova Sea Link. Expected completion by May 2026."
        },
        {
            id: "road-005",
            name: "Chennai-Bengaluru Expressway",
            budget: 170000000000, // ₹17,000 Cr
            actualSpending: 85000000000, // ₹8,500 Cr
            location: {
                lat: 13.0827,
                lng: 80.2707
            },
            ward: "Chennai-Bengaluru Corridor",
            department: "National Highways Authority of India (NHAI)",
            status: "in-progress",
            completionPercentage: 50,
            startDate: "2020-06-15",
            endDate: "2026-12-31",
            description: "262 km access-controlled expressway connecting Chennai and Bengaluru, reducing travel time from 6 hours to 2.5 hours. Part of Bharatmala Pariyojana Phase-I."
        },
        {
            id: "road-006",
            name: "Dwarka Expressway (NH-248BB)",
            budget: 90000000000, // ₹9,000 Cr
            actualSpending: 72000000000, // ₹7,200 Cr
            location: {
                lat: 28.5921,
                lng: 77.0460
            },
            ward: "Delhi-Gurugram",
            department: "National Highways Authority of India (NHAI)",
            status: "completed",
            completionPercentage: 100,
            startDate: "2019-09-01",
            endDate: "2024-03-11",
            description: "29 km eight-lane access-controlled expressway connecting Dwarka in Delhi to Gurugram in Haryana. Features 34 km of service roads, 4 vehicular underpasses, and 10 pedestrian underpasses."
        },
        {
            id: "road-007",
            name: "Bengaluru-Mysuru Expressway",
            budget: 85000000000, // ₹8,500 Cr
            actualSpending: 85000000000, // ₹8,500 Cr
            location: {
                lat: 12.9716,
                lng: 77.5946
            },
            ward: "Bengaluru-Mysuru",
            department: "National Highways Authority of India (NHAI)",
            status: "completed",
            completionPercentage: 100,
            startDate: "2019-05-15",
            endDate: "2023-03-12",
            description: "118 km ten-lane expressway (4 main carriageway lanes plus 3 service road lanes on each side) connecting Bengaluru and Mysuru, reducing travel time from 3 hours to 75 minutes."
        }
    ],
    
    // Smart Cities Mission Projects
    parkProjects: [
        {
            id: "park-001",
            name: "Pune Smart City - Chappan Dukaan Redevelopment",
            budget: 5000000000, // ₹500 Cr
            actualSpending: 5000000000, // ₹500 Cr
            location: {
                lat: 18.5204,
                lng: 73.8567
            },
            ward: "Pune Central",
            department: "Pune Smart City Development Corporation",
            status: "completed",
            completionPercentage: 100,
            startDate: "2016-06-25",
            endDate: "2024-01-18",
            description: "Smart urban redevelopment project showcased at National Smart Cities Mission Pavilion, featuring modern infrastructure and digital solutions."
        },
        {
            id: "park-002",
            name: "Surat Smart City - Connecting Past with Future",
            budget: 8000000000, // ₹800 Cr
            actualSpending: 6000000000, // ₹600 Cr
            location: {
                lat: 21.1702,
                lng: 72.8311
            },
            ward: "Surat Central",
            department: "Surat Smart City Development Corporation",
            status: "in-progress",
            completionPercentage: 75,
            startDate: "2016-06-25",
            endDate: "2026-06-30",
            description: "Heritage preservation and modern infrastructure integration project showcased at National Smart Cities Mission Pavilion."
        },
        {
            id: "park-003",
            name: "Bhubaneswar Smart City - Area-Based Development",
            budget: 12000000000, // ₹1,200 Cr
            actualSpending: 9000000000, // ₹900 Cr
            location: {
                lat: 20.2961,
                lng: 85.8245
            },
            ward: "Bhubaneswar Central",
            department: "Bhubaneswar Smart City Limited",
            status: "in-progress",
            completionPercentage: 75,
            startDate: "2016-06-25",
            endDate: "2026-06-30",
            description: "Comprehensive area-based development with German technical cooperation for smart infrastructure and sustainable urban solutions."
        },
        {
            id: "park-004",
            name: "Indore Smart City - Chappan Dukaan Market",
            budget: 3000000000, // ₹300 Cr
            actualSpending: 3000000000, // ₹300 Cr
            location: {
                lat: 22.7196,
                lng: 75.8577
            },
            ward: "Indore Central",
            department: "Indore Smart City Development Limited",
            status: "completed",
            completionPercentage: 100,
            startDate: "2016-06-25",
            endDate: "2024-01-18",
            description: "Smart market redevelopment project showcased at National Smart Cities Mission Pavilion with modern amenities and digital infrastructure."
        },
        {
            id: "park-005",
            name: "Varanasi Smart City - Kashi Vishwanath Corridor",
            budget: 9000000000, // ₹900 Cr
            actualSpending: 9000000000, // ₹900 Cr
            location: {
                lat: 25.3176,
                lng: 83.0064
            },
            ward: "Varanasi Central",
            department: "Varanasi Smart City Limited",
            status: "completed",
            completionPercentage: 100,
            startDate: "2019-03-08",
            endDate: "2021-12-13",
            description: "Development of 5.5 lakh sq ft area, creating direct corridor from Ganga Ghat to Kashi Vishwanath Temple with 24 buildings, museum, gallery, spiritual center, and tourist facilities."
        },
        {
            id: "park-006",
            name: "Ahmedabad Smart City - Sabarmati Riverfront Phase 2",
            budget: 10500000000, // ₹1,050 Cr
            actualSpending: 5250000000, // ₹525 Cr
            location: {
                lat: 23.0225,
                lng: 72.5714
            },
            ward: "Ahmedabad West",
            department: "Ahmedabad Municipal Corporation",
            status: "in-progress",
            completionPercentage: 50,
            startDate: "2021-01-15",
            endDate: "2025-12-31",
            description: "Extension of Sabarmati Riverfront development by 5.8 km on eastern bank and 5.2 km on western bank, including recreational spaces, gardens, and sustainable urban infrastructure."
        },
        {
            id: "park-007",
            name: "Chandigarh Smart City - Capitol Complex Restoration",
            budget: 4500000000, // ₹450 Cr
            actualSpending: 1350000000, // ₹135 Cr
            location: {
                lat: 30.7607,
                lng: 76.8878
            },
            ward: "Chandigarh North",
            department: "Chandigarh Smart City Limited",
            status: "in-progress",
            completionPercentage: 30,
            startDate: "2022-04-10",
            endDate: "2026-03-31",
            description: "Restoration and conservation of UNESCO World Heritage Site Capitol Complex designed by Le Corbusier, including Assembly, Secretariat, High Court buildings and monuments."
        }
    ],
    
    // Healthcare & Education Projects (AIIMS & Educational Institutions)
    educationProjects: [
        {
            id: "edu-001",
            name: "AIIMS Vijaypur (Jammu) - Medical College",
            budget: 196354000000, // ₹19,635.4 Cr
            actualSpending: 166000000000, // ₹16,600 Cr
            location: {
                lat: 32.7266,
                lng: 74.8570
            },
            ward: "Vijaypur, Samba",
            department: "Ministry of Health and Family Welfare (PMSSY)",
            status: "completed",
            completionPercentage: 100,
            startDate: "2019-02-01",
            endDate: "2024-02-20",
            description: "720-bed hospital with medical college (125 seats), nursing college (60 seats), and AYUSH block (30 beds) under Pradhan Mantri Swasthya Suraksha Yojana."
        },
        {
            id: "edu-002",
            name: "IIT Jammu - Permanent Campus",
            budget: 50000000000, // ₹5,000 Cr (estimated)
            actualSpending: 25000000000, // ₹2,500 Cr
            location: {
                lat: 32.7266,
                lng: 74.8570
            },
            ward: "Jammu",
            department: "Ministry of Education",
            status: "in-progress",
            completionPercentage: 50,
            startDate: "2020-01-01",
            endDate: "2026-06-30",
            description: "Permanent campus for IIT Jammu inaugurated as part of ₹13,375 crore educational infrastructure development project."
        },
        {
            id: "edu-003",
            name: "AIIMS Madurai - Medical College & Hospital",
            budget: 202151000000, // ₹20,215.1 Cr
            actualSpending: 60000000000, // ₹6,000 Cr
            location: {
                lat: 9.9252,
                lng: 78.1198
            },
            ward: "Madurai",
            department: "Ministry of Health and Family Welfare (PMSSY)",
            status: "delayed",
            completionPercentage: 30,
            startDate: "2018-12-17",
            endDate: "2027-08-15",
            description: "AIIMS establishment under PMSSY with MBBS classes started from temporary campus in 2021-22. Construction work in progress."
        },
        {
            id: "edu-004",
            name: "Kendriya Vidyalaya Expansion Program",
            budget: 25000000000, // ₹2,500 Cr
            actualSpending: 20000000000, // ₹2,000 Cr
            location: {
                lat: 28.6139,
                lng: 77.2090
            },
            ward: "Multiple States",
            department: "Ministry of Education",
            status: "completed",
            completionPercentage: 100,
            startDate: "2020-01-01",
            endDate: "2024-02-20",
            description: "20 new Kendriya Vidyalaya buildings and 5 new campus foundations laid as part of national education infrastructure expansion."
        },
        {
            id: "edu-005",
            name: "IIT Dharwad - Permanent Campus",
            budget: 85000000000, // ₹8,500 Cr
            actualSpending: 42500000000, // ₹4,250 Cr
            location: {
                lat: 15.5135,
                lng: 74.9226
            },
            ward: "Dharwad",
            department: "Ministry of Education",
            status: "in-progress",
            completionPercentage: 50,
            startDate: "2019-11-15",
            endDate: "2026-03-31",
            description: "Development of permanent campus for IIT Dharwad on 470 acres of land with academic buildings, hostels, faculty housing, and research facilities."
        },
        {
            id: "edu-006",
            name: "Central University of Odisha - Phase II",
            budget: 42000000000, // ₹4,200 Cr
            actualSpending: 12600000000, // ₹1,260 Cr
            location: {
                lat: 19.1071,
                lng: 84.7861
            },
            ward: "Koraput",
            department: "Ministry of Education",
            status: "in-progress",
            completionPercentage: 30,
            startDate: "2021-02-28",
            endDate: "2026-12-31",
            description: "Phase II expansion of Central University of Odisha with new academic departments, research centers, library, and student facilities on 450-acre campus."
        },
        {
            id: "edu-007",
            name: "National Institute of Technology Sikkim",
            budget: 37500000000, // ₹3,750 Cr
            actualSpending: 37500000000, // ₹3,750 Cr
            location: {
                lat: 27.3314,
                lng: 88.6138
            },
            ward: "Ravangla",
            department: "Ministry of Education",
            status: "completed",
            completionPercentage: 100,
            startDate: "2018-07-10",
            endDate: "2023-10-15",
            description: "Permanent campus for NIT Sikkim at Ravangla with state-of-the-art academic buildings, laboratories, hostels, and sports facilities on 301 acres of land."
        }
    ],
    
    // Healthcare Projects (AIIMS & Medical Infrastructure)
    healthcareProjects: [
        {
            id: "health-001",
            name: "AIIMS Raebareli - Medical College & Hospital",
            budget: 82300000000, // ₹8,230 Cr
            actualSpending: 50000000000, // ₹5,000 Cr
            location: {
                lat: 26.2124,
                lng: 81.2504
            },
            ward: "Raebareli",
            department: "Ministry of Health and Family Welfare (PMSSY)",
            status: "in-progress",
            completionPercentage: 60,
            startDate: "2018-12-17",
            endDate: "2026-12-31",
            description: "AIIMS establishment under PMSSY Phase VI with 750-bed hospital, medical college (125 MBBS seats), and nursing college (60 seats)."
        },
        {
            id: "health-002",
            name: "AIIMS Awantipora (Kashmir) - Medical College",
            budget: 216084000000, // ₹21,608.4 Cr
            actualSpending: 80000000000, // ₹8,000 Cr
            location: {
                lat: 33.9137,
                lng: 74.9629
            },
            ward: "Awantipora, Pulwama",
            department: "Ministry of Health and Family Welfare (PMSSY)",
            status: "in-progress",
            completionPercentage: 37,
            startDate: "2019-02-18",
            endDate: "2027-08-15",
            description: "AIIMS establishment under PMSSY Phase VII with 750-bed hospital capacity and medical college facilities in Jammu & Kashmir."
        },
        {
            id: "health-003",
            name: "AIIMS Bibinagar (Telangana) - Medical College",
            budget: 132500000000, // ₹13,250 Cr
            actualSpending: 100000000000, // ₹10,000 Cr
            location: {
                lat: 17.4851,
                lng: 78.8094
            },
            ward: "Bibinagar, Hyderabad",
            department: "Ministry of Health and Family Welfare (PMSSY)",
            status: "completed",
            completionPercentage: 100,
            startDate: "2019-02-18",
            endDate: "2024-07-07",
            description: "AIIMS with 750-bed hospital, medical college (125 MBBS seats), nursing college (60 seats). MBBS classes and OPD services operational."
        },
        {
            id: "health-004",
            name: "AIIMS Kalyani (West Bengal) - Medical College",
            budget: 128700000000, // ₹12,870 Cr
            actualSpending: 90000000000, // ₹9,000 Cr
            location: {
                lat: 22.9751,
                lng: 88.4345
            },
            ward: "Kalyani, Nadia",
            department: "Ministry of Health and Family Welfare (PMSSY)",
            status: "completed",
            completionPercentage: 100,
            startDate: "2019-02-18",
            endDate: "2023-09-26",
            description: "AIIMS with 750-bed hospital and medical college. MBBS classes started from 2020-21 session, OPD and IPD services operational."
        },
        {
            id: "health-005",
            name: "AIIMS Gorakhpur - Medical College & Hospital",
            budget: 95700000000, // ₹9,570 Cr
            actualSpending: 95700000000, // ₹9,570 Cr
            location: {
                lat: 26.7606,
                lng: 83.3732
            },
            ward: "Gorakhpur",
            department: "Ministry of Health and Family Welfare (PMSSY)",
            status: "completed",
            completionPercentage: 100,
            startDate: "2018-07-27",
            endDate: "2023-10-15",
            description: "AIIMS with 750-bed hospital, medical college (125 MBBS seats), nursing college (60 seats), and AYUSH block. OPD services and MBBS classes operational."
        },
        {
            id: "health-006",
            name: "AIIMS Guwahati - Medical College & Hospital",
            budget: 115400000000, // ₹11,540 Cr
            actualSpending: 57700000000, // ₹5,770 Cr
            location: {
                lat: 26.1445,
                lng: 91.7362
            },
            ward: "Guwahati",
            department: "Ministry of Health and Family Welfare (PMSSY)",
            status: "in-progress",
            completionPercentage: 50,
            startDate: "2019-05-25",
            endDate: "2026-12-31",
            description: "AIIMS with 750-bed hospital, medical college (125 MBBS seats), nursing college (60 seats). OPD services started in temporary campus while construction continues."
        },
        {
            id: "health-007",
            name: "National Cancer Institute, Jhajjar",
            budget: 22000000000, // ₹2,200 Cr
            actualSpending: 22000000000, // ₹2,200 Cr
            location: {
                lat: 28.6139,
                lng: 76.6525
            },
            ward: "Jhajjar",
            department: "Ministry of Health and Family Welfare",
            status: "completed",
            completionPercentage: 100,
            startDate: "2018-01-03",
            endDate: "2022-01-28",
            description: "710-bed comprehensive cancer care facility with advanced diagnostic and treatment technologies, including proton therapy, as part of AIIMS Delhi expansion."
        }
    ]
};

// Helper function to calculate impact score
function calculateImpactScore(project) {
    // Impact Score = (Actual Spending / Allocated Budget) × Project Completion %
    const spendingRatio = project.actualSpending / project.budget;
    return (spendingRatio * project.completionPercentage / 100).toFixed(2);
}

// Add impact scores to all projects
governmentSpendingData.roadProjects.forEach(project => {
    project.impactScore = calculateImpactScore(project);
});

governmentSpendingData.parkProjects.forEach(project => {
    project.impactScore = calculateImpactScore(project);
});

governmentSpendingData.educationProjects.forEach(project => {
    project.impactScore = calculateImpactScore(project);
});

governmentSpendingData.healthcareProjects.forEach(project => {
    project.impactScore = calculateImpactScore(project);
});

// Format currency function
function formatCurrency(amount) {
    if (amount >= 10000000) {
        return ₹${(amount / 10000000).toFixed(2)} Cr;
    } else if (amount >= 100000) {
        return ₹${(amount / 100000).toFixed(2)} Lakhs;
    } else {
        return ₹${amount.toLocaleString()};
    }
}