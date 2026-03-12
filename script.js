/**
 * Indian Road Travel Guide - Logic
 * 
 * DSA CONCEPTS IMPLEMENTED:
 * 1. GRAPH: Represented using an Adjacency List to store city connections and distances.
 * 2. DIJKSTRA'S ALGORITHM: Used to find the shortest path between two cities in the graph.
 * 3. STACK: Used to maintain navigation history (visited places) for the "Back" functionality.
 * 4. HASH MAP: JavaScript Map used for O(1) lookup of destination details by name.
 * 5. LINKED LIST: Used to store the master list of destinations.
 */

// --- 1. STACK DATA STRUCTURE (For Navigation History) ---
class Stack {
    constructor() {
        this.items = [];
    }
    // push(place): Adds a visited place to the top of the stack
    push(element) {
        this.items.push(element);
    }
    // pop(): Removes the most recently visited place from the stack
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
    toArray() {
        return [...this.items];
    }
}

const navigationStack = new Stack();

// --- 2. GRAPH DATA STRUCTURE (Using Adjacency List) ---
class Graph {
    constructor() {
        // Adjacency List: Map where key is city name, value is array of {node, weight}
        this.adjacencyList = new Map();
    }

    addNode(node) {
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
        }
    }

    addEdge(node1, node2, weight) {
        // Bi-directional edges representing two-way roads
        this.adjacencyList.get(node1).push({ node: node2, weight });
        this.adjacencyList.get(node2).push({ node: node1, weight });
    }

    getNeighbors(node) {
        return this.adjacencyList.get(node) || [];
    }

    // --- 3. DIJKSTRA'S ALGORITHM (Shortest Path Finding) ---
    dijkstra(startNode, endNode) {
        const distances = {};
        const previous = {};
        const nodes = new PriorityQueue();

        // Initialize distances: Start node is 0, all others are Infinity
        for (let node of this.adjacencyList.keys()) {
            if (node === startNode) {
                distances[node] = 0;
                nodes.enqueue(node, 0);
            } else {
                distances[node] = Infinity;
                nodes.enqueue(node, Infinity);
            }
            previous[node] = null;
        }

        while (!nodes.isEmpty()) {
            let smallest = nodes.dequeue().val;

            if (smallest === endNode) {
                // Path found! Backtrack using the 'previous' map
                const path = [];
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                return {
                    path: path.concat(startNode).reverse(),
                    distance: distances[endNode]
                };
            }

            if (!smallest || distances[smallest] === Infinity) break;

            // Visit neighbors and update distances
            for (let neighbor of this.adjacencyList.get(smallest)) {
                let candidate = distances[smallest] + neighbor.weight;
                if (candidate < distances[neighbor.node]) {
                    distances[neighbor.node] = candidate;
                    previous[neighbor.node] = smallest;
                    nodes.enqueue(neighbor.node, candidate);
                }
            }
        }
        return null;
    }
}

// Helper Priority Queue for Dijkstra
class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }
    dequeue() {
        return this.values.shift();
    }
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
    isEmpty() {
        return this.values.length === 0;
    }
}

// --- 4. DATA INITIALIZATION ---

// Master Destination Data
const initialDestinations = [
    { 
        name: "Delhi", state: "Delhi", cost: 5000, rating: 4.5, 
        description: "The capital city with rich history and vibrant street food.",
        attractions: ["Red Fort", "Qutub Minar", "India Gate", "Lotus Temple"],
        imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        famousFood: "Chole Bhature, Paranthas",
        famousClothes: "Salwar Kameez, Kurta",
        cultureInfo: "A cosmopolitan blend of Mughal heritage and modern urban life.",
        transportMode: "Flight, Train, Metro"
    },
    { 
        name: "Mumbai", state: "Maharashtra", cost: 7000, rating: 4.7, 
        description: "The City of Dreams, famous for Marine Drive and Bollywood.",
        attractions: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Juhu Beach"],
        imageUrl: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80",
        famousFood: "Vada Pav, Pav Bhaji",
        famousClothes: "Paithani Saree, Kurta",
        cultureInfo: "Fast-paced, diverse, and the heart of India's film industry.",
        transportMode: "Flight, Train, Local Train"
    },
    { 
        name: "Hyderabad", state: "Telangana", cost: 4500, rating: 4.6, 
        description: "Known for its Biryani, Charminar, and tech hubs.",
        attractions: ["Charminar", "Golconda Fort", "Ramoji Film City", "Hussain Sagar"],
        imageUrl: "https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=800&q=80",
        famousFood: "Hyderabadi Biryani",
        famousClothes: "Khada Dupatta, Sherwani",
        cultureInfo: "A unique mix of Nizami heritage and modern technology.",
        transportMode: "Flight, Train, Bus"
    },
    { 
        name: "Jaipur", state: "Rajasthan", cost: 3500, rating: 4.8, 
        description: "The Pink City, home to majestic forts and palaces.",
        attractions: ["Hawa Mahal", "Amer Fort", "City Palace", "Jantar Mantar"],
        imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        famousFood: "Dal Baati Churma",
        famousClothes: "Bandhani, Leheriya",
        cultureInfo: "Rich Rajputana royalty, folk music, and traditional arts.",
        transportMode: "Train, Bus, Flight"
    },
    { 
        name: "Goa", state: "Goa", cost: 8000, rating: 4.9, 
        description: "India's beach paradise with a mix of Portuguese culture.",
        attractions: ["Baga Beach", "Basilica of Bom Jesus", "Dudhsagar Falls", "Fort Aguada"],
        imageUrl: "https://images.unsplash.com/photo-1512789170614-5627b5227f81?auto=format&fit=crop&w=800&q=80",
        famousFood: "Fish Curry, Bebinca",
        famousClothes: "Western-style, Pano Bhaju",
        cultureInfo: "Indo-Portuguese fusion with a relaxed 'Susegad' lifestyle.",
        transportMode: "Flight, Train, Bike Rental"
    },
    { 
        name: "Kerala", state: "Kerala", cost: 9000, rating: 4.7, 
        description: "God's Own Country, famous for backwaters and greenery.",
        attractions: ["Alleppey Backwaters", "Munnar Tea Gardens", "Thekkady", "Varkala Beach"],
        imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
        famousFood: "Appam with Stew, Sadya",
        famousClothes: "Mundu, Kasavu Saree",
        cultureInfo: "Deeply rooted in Ayurveda, Kathakali, and simple living.",
        transportMode: "Flight, Train, Houseboat"
    },
    { 
        name: "Agra", state: "Uttar Pradesh", cost: 3000, rating: 4.9, 
        description: "Home to the iconic Taj Mahal, a wonder of the world.",
        attractions: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mehtab Bagh"],
        imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657451dd7?auto=format&fit=crop&w=800&q=80",
        famousFood: "Petha, Bedai",
        famousClothes: "Zardosi Embroidery",
        cultureInfo: "The lasting legacy of the Mughal Empire and Braj traditions.",
        transportMode: "Train, Bus, Taxi"
    },
    { 
        name: "Leh-Ladakh", state: "Ladakh", cost: 15000, rating: 5.0, 
        description: "Breathtaking landscapes and high-altitude mountain passes.",
        attractions: ["Pangong Lake", "Nubra Valley", "Shanti Stupa", "Magnetic Hill"],
        imageUrl: "https://images.unsplash.com/photo-1590050752117-23a9d7f28a31?auto=format&fit=crop&w=800&q=80",
        famousFood: "Thukpa, Skyu",
        famousClothes: "Goncha, Kuntop",
        cultureInfo: "Tibetan Buddhist influence and resilient nomadic traditions.",
        transportMode: "Flight, Bike Expedition"
    },
    { 
        name: "Varanasi", state: "Uttar Pradesh", cost: 4000, rating: 4.8, 
        description: "One of the oldest living cities in the world, spiritual heart of India.",
        attractions: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Sarnath", "Assi Ghat"],
        imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        famousFood: "Kachori Sabzi, Banarasi Paan",
        famousClothes: "Banarasi Silk Saree",
        cultureInfo: "The spiritual center of Hinduism with ancient Ghat traditions.",
        transportMode: "Train, Flight, Boat"
    },
    { 
        name: "Manali", state: "Himachal Pradesh", cost: 6500, rating: 4.7, 
        description: "A high-altitude Himalayan resort town for adventure and peace.",
        attractions: ["Rohtang Pass", "Solang Valley", "Hadimba Devi Temple", "Old Manali"],
        imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        famousFood: "Siddu, Trout Fish",
        famousClothes: "Kullu Shawls, Pattu",
        cultureInfo: "Vibrant Himachali folk culture and mountain lifestyle.",
        transportMode: "Bus, Taxi, Bike"
    },
    { 
        name: "Rishikesh", state: "Uttarakhand", cost: 3800, rating: 4.6, 
        description: "The Yoga Capital of the World, situated on the banks of the Ganges.",
        attractions: ["Laxman Jhula", "Ram Jhula", "Triveni Ghat", "Beatles Ashram"],
        imageUrl: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=80",
        famousFood: "Ayurvedic Cuisine, Masala Tea",
        famousClothes: "Cotton Kurtas",
        cultureInfo: "A global hub for yoga, meditation, and spiritual seekers.",
        transportMode: "Train, Bus, Taxi"
    },
    { 
        name: "Mysore", state: "Karnataka", cost: 4200, rating: 4.5, 
        description: "Known for its heritage structures and palaces, including Mysore Palace.",
        attractions: ["Mysore Palace", "Chamundi Hill", "Brindavan Gardens", "St. Philomena's Church"],
        imageUrl: "https://images.unsplash.com/photo-1588613236266-4112039163c0?auto=format&fit=crop&w=800&q=80",
        famousFood: "Mysore Pak, Mysore Masala Dosa",
        famousClothes: "Mysore Silk Saree",
        cultureInfo: "Royal heritage, classical arts, and the grand Dasara festival.",
        transportMode: "Train, Bus, Taxi"
    },
    { 
        name: "Pondicherry", state: "Puducherry", cost: 5500, rating: 4.7, 
        description: "A French colonial settlement in India with preserved architecture.",
        attractions: ["Paradise Beach", "Auroville", "Rock Beach", "French Quarter"],
        imageUrl: "https://images.unsplash.com/photo-1589793463357-5fb813435467?auto=format&fit=crop&w=800&q=80",
        famousFood: "Crepes, Ratatouille (Indo-French)",
        famousClothes: "Cotton fabrics",
        cultureInfo: "A charming blend of French colonial charm and Indian spirituality.",
        transportMode: "Bus, Train, Bike Rental"
    },
    { 
        name: "Amritsar", state: "Punjab", cost: 3200, rating: 4.9, 
        description: "Home to the Golden Temple, the holiest Gurdwara of Sikhism.",
        attractions: ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Partition Museum"],
        imageUrl: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80",
        famousFood: "Amritsari Kulcha, Lassi",
        famousClothes: "Phulkari Embroidery",
        cultureInfo: "Heart of Sikh traditions, known for immense hospitality.",
        transportMode: "Train, Flight, Bus"
    },
    { 
        name: "Hampi", state: "Karnataka", cost: 4800, rating: 4.8, 
        description: "Ancient village with numerous ruined temple complexes.",
        attractions: ["Virupaksha Temple", "Vittala Temple", "Lotus Mahal", "Matanga Hill"],
        imageUrl: "https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?auto=format&fit=crop&w=800&q=80",
        famousFood: "South Indian Thali",
        famousClothes: "Traditional Cotton",
        cultureInfo: "The ruins of the Vijayanagara Empire with a modern hippie vibe.",
        transportMode: "Train, Bus, Cycle"
    },
    { 
        name: "Udaipur", state: "Rajasthan", cost: 6000, rating: 4.9, 
        description: "The City of Lakes, known for its lavish royal residences.",
        attractions: ["City Palace", "Lake Pichola", "Jag Mandir", "Fateh Sagar Lake"],
        imageUrl: "https://images.unsplash.com/photo-1590593162211-f98f76d28ec5?auto=format&fit=crop&w=800&q=80",
        famousFood: "Ker Sangri",
        famousClothes: "Gota Patti",
        cultureInfo: "Romantic lake city with deep Mewar historical roots.",
        transportMode: "Train, Flight, Taxi"
    },
    { 
        name: "Shimla", state: "Himachal Pradesh", cost: 5200, rating: 4.6, 
        description: "The summer capital of British India, set in the Himalayan foothills.",
        attractions: ["The Ridge", "Mall Road", "Jakhu Temple", "Kufri"],
        imageUrl: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80",
        famousFood: "Madra, Dham",
        famousClothes: "Pahari Caps",
        cultureInfo: "Colonial architecture mixed with traditional hill station life.",
        transportMode: "Toy Train, Bus, Taxi"
    },
    { 
        name: "Darjeeling", state: "West Bengal", cost: 5800, rating: 4.7, 
        description: "Famous for its tea industry and the views of Kangchenjunga.",
        attractions: ["Tiger Hill", "Batasia Loop", "Darjeeling Himalayan Railway", "Peace Pagoda"],
        imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        famousFood: "Momos, Thukpa",
        famousClothes: "Bakhu",
        cultureInfo: "Tea garden culture with a strong Gorkha influence.",
        transportMode: "Toy Train, Bus, Taxi"
    },
    { 
        name: "Madurai", state: "Tamil Nadu", cost: 3900, rating: 4.8, 
        description: "An ancient city on the Vaigai River, home to Meenakshi Amman Temple.",
        attractions: ["Meenakshi Amman Temple", "Thirumalai Nayakkar Mahal", "Gandhi Museum", "Koodal Azhagar Temple"],
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        famousFood: "Jigarthanda, Idli",
        famousClothes: "Sungudi Saree",
        cultureInfo: "One of the oldest continuously inhabited cities with rich Tamil heritage.",
        transportMode: "Train, Bus, Taxi"
    },
    { 
        name: "Jodhpur", state: "Rajasthan", cost: 4400, rating: 4.7, 
        description: "The Blue City, dominated by the massive Mehrangarh Fort.",
        attractions: ["Mehrangarh Fort", "Jaswant Thada", "Umaid Bhawan Palace", "Mandore Gardens"],
        imageUrl: "https://images.unsplash.com/photo-1562315115-af334af65706?auto=format&fit=crop&w=800&q=80",
        famousFood: "Mawa Kachori, Mirchi Bada",
        famousClothes: "Jodhpuri Suit",
        cultureInfo: "Strong Marwar traditions and iconic blue-painted houses.",
        transportMode: "Train, Bus, Taxi"
    },
    { 
        name: "Kolkata", state: "West Bengal", cost: 4200, rating: 4.6, 
        description: "The City of Joy, known for its colonial architecture and festivals.",
        attractions: ["Victoria Memorial", "Howrah Bridge", "Dakshineswar Temple", "Park Street"],
        imageUrl: "https://images.unsplash.com/photo-1558431382-27e39cbef4bc?auto=format&fit=crop&w=800&q=80",
        famousFood: "Rosogolla, Macher Jhol",
        famousClothes: "Baluchari Saree, Dhoti",
        cultureInfo: "The intellectual and artistic capital of India, famous for Durga Puja.",
        transportMode: "Flight, Train, Tram"
    },
    { 
        name: "Bangalore", state: "Karnataka", cost: 6500, rating: 4.5, 
        description: "The Silicon Valley of India, famous for its parks and nightlife.",
        attractions: ["Lalbagh", "Cubbon Park", "Bangalore Palace", "Bannerghatta Park"],
        imageUrl: "https://images.unsplash.com/photo-1596761301586-5c400f7155a0?auto=format&fit=crop&w=800&q=80",
        famousFood: "Bisi Bele Bath, Benne Dosa",
        famousClothes: "Silk Sarees",
        cultureInfo: "A tech-savvy city with a vibrant pub culture and garden spaces.",
        transportMode: "Flight, Train, Metro"
    },
    { 
        name: "Chennai", state: "Tamil Nadu", cost: 5000, rating: 4.4, 
        description: "Gateway to South India, known for its beaches and temples.",
        attractions: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George", "San Thome Basilica"],
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        famousFood: "Idli, Sambar, Filter Coffee",
        famousClothes: "Kanchipuram Silk Saree",
        cultureInfo: "A hub for Carnatic music, Bharatnatyam, and Dravidian culture.",
        transportMode: "Flight, Train, Bus"
    },
    { 
        name: "Ahmedabad", state: "Gujarat", cost: 4000, rating: 4.6, 
        description: "Known for its textile industry and Sabarmati Ashram.",
        attractions: ["Sabarmati Ashram", "Adalaj Stepwell", "Kankaria Lake", "Jama Masjid"],
        imageUrl: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=800&q=80",
        famousFood: "Dhokla, Khandvi",
        famousClothes: "Chaniya Choli",
        cultureInfo: "A mercantile city reflecting Gandhi's legacy and vibrant Garba nights.",
        transportMode: "Train, Flight, Bus"
    }
];

// Hash Map for O(1) lookup
const destinationMap = new Map();
const travelGraph = new Graph();
const tripQueue = []; // Queue for Road Trip Planner

initialDestinations.forEach(dest => {
    destinationMap.set(dest.name.toLowerCase(), dest);
    travelGraph.addNode(dest.name);
});

// Graph Edges (Distances in km)
travelGraph.addEdge("Delhi", "Jaipur", 280);
travelGraph.addEdge("Delhi", "Agra", 230);
travelGraph.addEdge("Delhi", "Leh-Ladakh", 950);
travelGraph.addEdge("Delhi", "Amritsar", 450);
travelGraph.addEdge("Delhi", "Rishikesh", 240);
travelGraph.addEdge("Jaipur", "Agra", 240);
travelGraph.addEdge("Jaipur", "Mumbai", 1150);
travelGraph.addEdge("Agra", "Varanasi", 600);
travelGraph.addEdge("Agra", "Hyderabad", 1250);
travelGraph.addEdge("Mumbai", "Goa", 580);
travelGraph.addEdge("Mumbai", "Hyderabad", 710);
travelGraph.addEdge("Goa", "Kerala", 750);
travelGraph.addEdge("Hyderabad", "Kerala", 850);
travelGraph.addEdge("Hyderabad", "Mysore", 730);
travelGraph.addEdge("Kerala", "Mysore", 450);
travelGraph.addEdge("Kerala", "Pondicherry", 580);
travelGraph.addEdge("Mysore", "Pondicherry", 460);
travelGraph.addEdge("Rishikesh", "Manali", 490);
travelGraph.addEdge("Delhi", "Manali", 540);
travelGraph.addEdge("Varanasi", "Hyderabad", 1100);
travelGraph.addEdge("Varanasi", "Kolkata", 680);
travelGraph.addEdge("Kolkata", "Darjeeling", 615);
travelGraph.addEdge("Bangalore", "Mysore", 145);
travelGraph.addEdge("Bangalore", "Hyderabad", 570);
travelGraph.addEdge("Bangalore", "Chennai", 345);
travelGraph.addEdge("Bangalore", "Hampi", 340);
travelGraph.addEdge("Chennai", "Pondicherry", 150);
travelGraph.addEdge("Chennai", "Madurai", 460);
travelGraph.addEdge("Madurai", "Kerala", 270);
travelGraph.addEdge("Hampi", "Goa", 315);
travelGraph.addEdge("Hampi", "Hyderabad", 370);
travelGraph.addEdge("Udaipur", "Jaipur", 390);
travelGraph.addEdge("Udaipur", "Jodhpur", 250);
travelGraph.addEdge("Udaipur", "Ahmedabad", 260);
travelGraph.addEdge("Ahmedabad", "Mumbai", 525);
travelGraph.addEdge("Jodhpur", "Jaipur", 330);
travelGraph.addEdge("Shimla", "Manali", 250);
travelGraph.addEdge("Shimla", "Delhi", 340);
travelGraph.addEdge("Shimla", "Rishikesh", 270);

// --- 5. CORE FEATURES ---

// 🧭 ROUTE PLANNER (Dijkstra)
function findShortestRoute() {
    const start = document.getElementById('source-select').value;
    const end = document.getElementById('dest-select').value;

    if (!start || !end) {
        alert("Please select both source and destination.");
        return;
    }

    if (start === end) {
        alert("Source and destination cannot be the same.");
        return;
    }

    const result = travelGraph.dijkstra(start, end);
    const container = document.getElementById('route-result');

    if (result) {
        const pathStr = result.path.join(' → ');
        const avgSpeed = 65; // km/h
        const travelTimeHours = Math.floor(result.distance / avgSpeed);
        
        container.innerHTML = `
            <div class="p-8 bg-india-green/10 rounded-3xl border-2 border-india-green/30 animate-in fade-in duration-500">
                <p class="font-black text-india-green mb-4 uppercase tracking-widest text-xs">Shortest Route Found!</p>
                <p class="text-2xl font-black text-slate-900 dark:text-white mb-6 leading-tight">${pathStr}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <p class="label-text mb-1">Distance</p>
                        <p class="text-xl font-black text-india-blue dark:text-blue-400">${result.distance} km</p>
                    </div>
                    <div class="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <p class="label-text mb-1">Travel Time</p>
                        <p class="text-xl font-black text-india-saffron">~${travelTimeHours} hours</p>
                    </div>
                </div>
            </div>
        `;
        renderVisualMap(result.path);
    } else {
        container.innerHTML = `<p class="text-red-500 font-bold">No route found between these locations.</p>`;
    }
}

// 📍 NEARBY PLACES FINDER (Graph Adjacency List Traversal)
function showNearby(cityName) {
    const dest = destinationMap.get(cityName.toLowerCase());
    if (!dest) return;

    // Push to Stack (Navigation History)
    navigationStack.push(dest);
    updateHistoryUI();

    const section = document.getElementById('nearby-attractions-section');
    const title = document.getElementById('nearby-title');
    const list = document.getElementById('attractions-list');
    const neighborsContainer = document.getElementById('neighbor-cities');

    section.classList.remove('hidden');
    title.innerText = `Tourist Guide: ${dest.name}`;
    
    // Add Culture, Food, Attire summary
    const infoSummary = document.createElement('div');
    infoSummary.className = 'col-span-full mb-8 p-6 bg-india-blue/5 dark:bg-india-blue/10 rounded-3xl border border-india-blue/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
    infoSummary.innerHTML = `
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-india-saffron rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-india-saffron/20">🍲</div>
            <div>
                <p class="text-[10px] font-black uppercase tracking-widest text-india-saffron">Famous Food</p>
                <p class="text-sm font-bold text-slate-800 dark:text-white">${dest.famousFood}</p>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-india-green rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-india-green/20">👗</div>
            <div>
                <p class="text-[10px] font-black uppercase tracking-widest text-india-green">Traditional Attire</p>
                <p class="text-sm font-bold text-slate-800 dark:text-white">${dest.famousClothes}</p>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-india-blue rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-india-blue/20">🚗</div>
            <div>
                <p class="text-[10px] font-black uppercase tracking-widest text-india-blue">Transport</p>
                <p class="text-sm font-bold text-slate-800 dark:text-white">${dest.transportMode}</p>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-black/20">💰</div>
            <div>
                <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">Cost / Person</p>
                <p class="text-sm font-bold text-slate-800 dark:text-white">₹${dest.cost.toLocaleString('en-IN')}</p>
            </div>
        </div>
        <div class="col-span-full pt-4 border-t border-india-blue/10">
            <p class="text-[10px] font-black uppercase tracking-widest text-india-blue mb-1">City Culture</p>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${dest.cultureInfo}</p>
        </div>
    `;
    
    // 1. Show Attractions (Internal to city)
    list.innerHTML = '';
    list.appendChild(infoSummary);
    dest.attractions.forEach(attr => {
        const card = document.createElement('div');
        card.className = 'p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center hover:border-india-saffron transition-colors';
        card.innerHTML = `
            <div class="w-10 h-10 bg-india-saffron/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-india-saffron"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <p class="font-black text-slate-800 dark:text-white">${attr}</p>
        `;
        list.appendChild(card);
    });

    // 2. Show Neighboring Cities (Graph Adjacency List Traversal)
    neighborsContainer.innerHTML = '';
    const neighbors = travelGraph.getNeighbors(dest.name);
    neighbors.forEach(n => {
        const badge = document.createElement('button');
        badge.onclick = () => showNearby(n.node);
        badge.className = 'px-4 py-2 bg-india-blue/10 text-india-blue dark:text-blue-400 rounded-lg text-xs font-black border border-india-blue/20 hover:bg-india-blue/20 transition-all';
        badge.innerText = `${n.node} (${n.weight}km)`;
        neighborsContainer.appendChild(badge);
    });

    section.scrollIntoView({ behavior: 'smooth' });
}

function closeNearby() {
    document.getElementById('nearby-attractions-section').classList.add('hidden');
}

// 🕘 NAVIGATION HISTORY (Stack)
function goBack() {
    if (navigationStack.size() > 1) {
        navigationStack.pop(); // Remove current place
        const previous = navigationStack.peek(); // Get previous place
        updateHistoryUI();
        showNearby(previous.name);
    } else if (navigationStack.size() === 1) {
        navigationStack.pop();
        updateHistoryUI();
        closeNearby();
    } else {
        alert("No previous location in history.");
    }
}

// 💰 BUDGET ESTIMATION (Local Storage)
function calculateBudget() {
    const travel = parseFloat(document.getElementById('travel-cost').value) || 0;
    const stay = parseFloat(document.getElementById('stay-cost').value) || 0;
    const food = parseFloat(document.getElementById('food-cost').value) || 0;
    const entry = parseFloat(document.getElementById('entry-fees').value) || 0;

    const total = travel + stay + food + entry;
    document.getElementById('total-budget').innerText = `₹${total.toLocaleString('en-IN')}`;
    
    // Store in Local Storage
    localStorage.setItem('tourist_guide_budget', total);
}

// 🚗 ROAD TRIP PLANNER (Queue)
function addToTrip(cityName) {
    const dest = destinationMap.get(cityName.toLowerCase());
    if (dest) {
        tripQueue.push(dest);
        renderTripPlanner();
        // Visual feedback
        const btn = event.currentTarget;
        const originalText = btn.innerText;
        btn.innerText = "Added!";
        btn.classList.add('bg-india-green');
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('bg-india-green');
        }, 1000);
    }
}

function renderTripPlanner() {
    const container = document.getElementById('trip-queue-display');
    if (tripQueue.length === 0) {
        container.innerHTML = '<span class="text-slate-400 italic">No places added yet. Click "Add to Trip" on any place card.</span>';
        return;
    }
    
    container.innerHTML = tripQueue.map((dest, index) => `
        <div class="flex items-center">
            <span class="px-4 py-2 bg-india-blue/10 text-india-blue dark:text-blue-400 rounded-xl font-black text-sm border border-india-blue/20">${dest.name}</span>
            ${index < tripQueue.length - 1 ? '<svg class="mx-2 text-slate-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' : ''}
        </div>
    `).join('');
}

function clearTrip() {
    tripQueue.length = 0;
    renderTripPlanner();
}

// 📊 SORTING (Bubble Sort)
function sortByCost() {
    const n = initialDestinations.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (initialDestinations[j].cost > initialDestinations[j + 1].cost) {
                // Swap
                const temp = initialDestinations[j];
                initialDestinations[j] = initialDestinations[j + 1];
                initialDestinations[j + 1] = temp;
            }
        }
    }
    renderDestinations();
}

// 📲 SHARING
function sharePlan() {
    if (tripQueue.length === 0) {
        alert("Add some places to your trip first!");
        return;
    }
    const plan = tripQueue.map(d => d.name).join(' → ');
    const budget = document.getElementById('total-budget').innerText;
    const message = `My Indian Road Trip Plan 🇮🇳\nRoute: ${plan}\nEstimated Budget: ${budget}\nPlanned with Indian Road Travel Guide!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// --- 6. UI RENDERING ---

function renderDestinations(filteredData = initialDestinations) {
    const container = document.getElementById('destinations-grid');
    container.innerHTML = '';
    
    if (filteredData.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-20 text-center">
                <div class="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300">No destinations found</h3>
                <p class="text-slate-500 dark:text-slate-400">Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    filteredData.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'rounded-2xl p-8 card-shadow flex flex-col h-full animate-in fade-in destination-card';
        card.style.backgroundImage = `url('${dest.imageUrl}')`;
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-3xl font-black leading-none group-hover:text-india-saffron transition-colors">${dest.name}</h3>
                <span class="bg-orange-100 text-white text-xs font-black px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">${dest.rating} ★</span>
            </div>
            <p class="text-xs mb-3 font-black uppercase tracking-widest opacity-90">${dest.state}</p>
            <p class="text-white text-sm font-medium mb-4 leading-relaxed line-clamp-2">${dest.description}</p>
            
            <div class="space-y-3 mb-6">
                <div class="flex items-start gap-2">
                    <span class="text-india-saffron text-sm">🍲</span>
                    <p class="text-white text-[11px] font-bold leading-tight"><span class="text-india-saffron uppercase">Food:</span> ${dest.famousFood}</p>
                </div>
                <div class="flex items-start gap-2">
                    <span class="text-india-green text-sm">👗</span>
                    <p class="text-white text-[11px] font-bold leading-tight"><span class="text-india-green uppercase">Attire:</span> ${dest.famousClothes}</p>
                </div>
                <div class="flex items-start gap-2">
                    <span class="text-india-blue text-sm">🚗</span>
                    <p class="text-white text-[11px] font-bold leading-tight"><span class="text-india-blue uppercase">Transport:</span> ${dest.transportMode}</p>
                </div>
            </div>

            <div class="mt-auto pt-6 border-t border-white/20">
                <div class="flex justify-between items-end mb-4">
                    <div>
                        <p class="text-[10px] font-black uppercase tracking-widest opacity-70">Cost / Person</p>
                        <p class="text-2xl font-black">₹${dest.cost.toLocaleString('en-IN')}</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="showNearby('${dest.name}')" class="py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-india-blue hover:text-white transition-all">Details</button>
                    <button onclick="addToTrip('${dest.name}')" class="py-3 bg-india-saffron text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all">Add to Trip</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderVisualMap(path) {
    const container = document.getElementById('visual-map');
    container.innerHTML = '';
    path.forEach((node, index) => {
        const nodeEl = document.createElement('div');
        nodeEl.className = 'flex flex-col items-center relative';
        nodeEl.innerHTML = `
            <div class="w-14 h-14 rounded-full bg-india-blue text-white flex items-center justify-center font-black shadow-xl z-10 border-4 border-white dark:border-slate-900">
                ${index + 1}
            </div>
            <p class="mt-3 text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">${node}</p>
        `;
        container.appendChild(nodeEl);
        if (index < path.length - 1) {
            const line = document.createElement('div');
            line.className = 'h-1 w-16 bg-india-saffron mt-7 -mx-2 shadow-sm';
            container.appendChild(line);
        }
    });
}

function updateHistoryUI() {
    const container = document.getElementById('history-stack');
    container.innerHTML = '';
    const history = navigationStack.toArray();
    if (history.length === 0) {
        container.innerHTML = '<span class="text-xs text-slate-400">No history</span>';
        return;
    }
    // Display stack from top to bottom
    history.slice().reverse().forEach(dest => {
        const badge = document.createElement('span');
        badge.className = 'history-badge';
        badge.innerText = dest.name;
        container.appendChild(badge);
    });
}

function populateSelects() {
    const sourceSelect = document.getElementById('source-select');
    const destSelect = document.getElementById('dest-select');
    initialDestinations.forEach(dest => {
        const opt1 = document.createElement('option');
        opt1.value = dest.name;
        opt1.textContent = dest.name;
        sourceSelect.appendChild(opt1);
        const opt2 = document.createElement('option');
        opt2.value = dest.name;
        opt2.textContent = dest.name;
        destSelect.appendChild(opt2);
    });
}

// THEME LOGIC
function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('dark_mode', isDark);
    updateThemeIcons(isDark);
}

function updateThemeIcons(isDark) {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

function loadSavedData() {
    // Load Theme
    const isDark = localStorage.getItem('dark_mode') === 'true';
    if (isDark) {
        document.documentElement.classList.add('dark');
        updateThemeIcons(true);
    } else {
        updateThemeIcons(false);
    }

    // Load Budget
    const savedBudget = localStorage.getItem('tourist_guide_budget');
    if (savedBudget) {
        document.getElementById('total-budget').innerText = `₹${parseFloat(savedBudget).toLocaleString('en-IN')} (Saved)`;
    }
}

// --- 7. INITIALIZATION ---
function applyFilters() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const stateFilter = document.getElementById('state-filter').value;
    const budgetFilter = document.getElementById('budget-filter').value;

    const filtered = initialDestinations.filter(dest => {
        const matchesSearch = dest.name.toLowerCase().includes(query) || 
                             dest.state.toLowerCase().includes(query);
        const matchesState = stateFilter === "" || dest.state === stateFilter;
        const matchesBudget = budgetFilter === "" || dest.cost <= parseInt(budgetFilter);

        return matchesSearch && matchesState && matchesBudget;
    });

    renderDestinations(filtered);
}

function populateStateFilter() {
    const stateFilter = document.getElementById('state-filter');
    const states = [...new Set(initialDestinations.map(d => d.state))].sort();
    
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.innerText = state;
        stateFilter.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    populateSelects();
    populateStateFilter();
    renderDestinations();
    renderTripPlanner();

    // World Map Modal Logic
    try {
        const worldMapModal = document.getElementById('world-map-modal');
        const modalContent = document.getElementById('modal-content');
        const worldMapToggle = document.getElementById('world-map-toggle');
        const closeModal = document.getElementById('close-modal');

        if (worldMapModal && modalContent && worldMapToggle && closeModal) {
            function openWorldMap() {
                worldMapModal.classList.remove('hidden');
                setTimeout(() => {
                    worldMapModal.classList.add('opacity-100');
                    modalContent.classList.remove('scale-95');
                    modalContent.classList.add('scale-100');
                }, 10);
            }

            function closeWorldMap() {
                worldMapModal.classList.remove('opacity-100');
                modalContent.classList.remove('scale-100');
                modalContent.classList.add('scale-95');
                setTimeout(() => {
                    worldMapModal.classList.add('hidden');
                }, 300);
            }

            worldMapToggle.addEventListener('click', openWorldMap);
            closeModal.addEventListener('click', closeWorldMap);
            worldMapModal.addEventListener('click', (e) => {
                if (e.target === worldMapModal) closeWorldMap();
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !worldMapModal.classList.contains('hidden')) {
                    closeWorldMap();
                }
            });
        }
    } catch (error) {
        console.error('Error initializing world map modal:', error);
    }

    document.getElementById('find-route-btn').addEventListener('click', findShortestRoute);
    document.getElementById('go-back-btn').addEventListener('click', goBack);
    document.getElementById('calc-btn').addEventListener('click', calculateBudget);
    document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
    document.getElementById('sort-btn').addEventListener('click', sortByCost);
    document.getElementById('share-btn').addEventListener('click', sharePlan);
    document.getElementById('clear-trip-btn').addEventListener('click', clearTrip);
    
    // Search & Filter functionality
    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('state-filter').addEventListener('change', applyFilters);
    document.getElementById('budget-filter').addEventListener('change', applyFilters);
});

// Expose globally
window.showNearby = showNearby;
window.closeNearby = closeNearby;
window.viewDetails = showNearby; // Alias for card button
window.addToTrip = addToTrip;
