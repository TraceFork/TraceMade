import { useState, useEffect, useRef } from 'react';
import { IntelligenceProvider } from './context/IntelligenceContext';
import { BehaviorProvider } from './context/BehaviorContext';
import { ModeProvider } from './context/ModeContext';
import CinematicGenesis from './components/CinematicGenesis';
import Intelligence3DField from './components/Intelligence3DField';
import ChromeLiquidUI from './components/ChromeLiquidUI';
import HeroZone from './components/HeroZone';
import IntelligenceDashboard from './components/IntelligenceDashboard';
import NeuralNetworkViz from './components/NeuralNetworkViz';
import DataFlowZone from './components/DataFlowZone';
import ExperimentsZone from './components/ExperimentsZone';
import PhilosophyZone from './components/PhilosophyZone';
import ContactZone from './components/ContactZone';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ExperimentalOverlays from './components/ExperimentalOverlays';
import PerformanceMonitor from './components/PerformanceMonitor';

function App() {
    const [genesisComplete, setGenesisComplete] = useState(false);
    const [systemReady, setSystemReady] = useState(false);

    useEffect(() => {
        const genesisTimer = setTimeout(() => {
            setGenesisComplete(true);
        }, 5000);

        const readyTimer = setTimeout(() => {
            setSystemReady(true);
        }, 6000);

        return () => {
            clearTimeout(genesisTimer);
            clearTimeout(readyTimer);
        };
    }, []);

    return (
        <IntelligenceProvider>
            <BehaviorProvider>
                <ModeProvider>
                    <div className="app-container">
                        {!genesisComplete && <CinematicGenesis onComplete={() => setGenesisComplete(true)} />}
                        {genesisComplete && (
                            <>
                                <Intelligence3DField />
                                <ChromeLiquidUI />
                                <main className="main-experience">
                                    <HeroZone />
                                    <IntelligenceDashboard />
                                    <NeuralNetworkViz />
                                    <DataFlowZone />
                                    <ExperimentsZone />
                                    <PhilosophyZone />
                                    <ContactZone />
                                </main>
                                <Footer />
                                <CustomCursor />
                                <ExperimentalOverlays />
                                <PerformanceMonitor />
                            </>
                        )}
                    </div>
                </ModeProvider>
            </BehaviorProvider>
        </IntelligenceProvider>
    );
}

export default App;
