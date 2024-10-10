import React, { useEffect, useState } from 'react';
import BarGraph from '../components/charts/barChart'; 
import NumberDisplay from '../components/charts/numberDisplay';
import PieGraph from '../components/charts/pieChart';
import TableChart from '../components/charts/tableChart';
import MultiNumberDisplay from '../components/charts/MultiNumberDisplay';
import RadarGraph from '../components/charts/radarChart';
import './Visualization.css'; 
import * as allTeamsConfigs from '../components/chart-configs/allTeams/configs';
import * as specificTeamConfigs from '../components/chart-configs/specificTeam/configs';
import scoutingData from '../scouting_data_dcmp.json'; 

const Visualization = () => {
    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
    const [activeTab, setActiveTab] = useState('AllTeams'); 
    const [openSections, setOpenSections] = useState(['general', 'autonomous', 'teleop', 'endgame', 'summary']);
    const [teamNumber, setTeamNumber] = useState(5951);

    useEffect(() => {
        const handleOrientationChange = (e) => {
            setIsPortrait(e.matches);
        };

        const mediaQuery = window.matchMedia("(orientation: portrait)");
        mediaQuery.addEventListener('change', handleOrientationChange);

        return () => mediaQuery.removeEventListener('change', handleOrientationChange);
    }, []);

    if (isPortrait) {
        return (
            <div className="rotate-message">
                <p>Please rotate your device to landscape for the best experience.</p>
            </div>
        );
    }

    const toggleSection = (sectionId) => {
        setOpenSections(prevState => 
            prevState.includes(sectionId) 
                ? prevState.filter(id => id !== sectionId) 
                : [...prevState, sectionId]
        );
    };

    const isSectionOpen = (sectionId) => openSections.includes(sectionId);

    const allTeamsRenderGeneralSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('general')}>
                General {isSectionOpen('general') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('general') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageMatchScoreConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxMatchScoreConfig(scoutingData)} />
                    </div>
                </div>
            )}
        </div>
    );

    const allTeamsRenderAutonomousSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('autonomous')}>
                Autonomous {isSectionOpen('autonomous') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('autonomous') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageAutonomousScoreConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxAutonomousScoreConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageAutonomousMovedConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageAutonomousSpeakerAccuracyConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageAutonomousFoulConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxAutonomousFoulConfig(scoutingData)} />
                    </div>
                </div>
            )}
        </div>
    );

    const allTeamsRenderTeleopSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('teleop')}>
                Tele-Op {isSectionOpen('teleop') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('teleop') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageTeleopScoreConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxTeleopScoreConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageTeleopSpeakerByTeamConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxTeleopSpeakerByTeamConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageTeleopAmpByTeamConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.maxTeleopAmpByTeamConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.teleopSpeakerPercentInByTeamConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.teleopAmpPercentInByTeamConfig(scoutingData)} />
                    </div>
                </div>
            )}
        </div>
    );

    const allTeamsRenderEndgameSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('endgame')}>
                Endgame {isSectionOpen('endgame') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('endgame') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.endgameClimbPercentByTeamConfig(scoutingData)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={allTeamsConfigs.averageEndgameTrapByTeamConfig(scoutingData)} />
                    </div>
                </div>
            )}
        </div>
    );

    const handleTeamNumberChange = (e) => {
        setTeamNumber(parseInt(e.target.value, 10));
    };

    const specificTeamRenderGeneralSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('general')}>
                General {isSectionOpen('general') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('general') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.matchScoreByRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <NumberDisplay config={specificTeamConfigs.averageScoreConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <TableChart config={specificTeamConfigs.commentsPerTeamTableConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.startPositionUsagePieConfig(scoutingData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const specificTeamRenderAutonomousSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('autonomous')}>
                Autonomous {isSectionOpen('autonomous') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('autonomous') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autonomousSpeakerConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <NumberDisplay config={specificTeamConfigs.averageAutoSpeakerConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autoPathPerRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.autoPathUsagePieConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autoHasMovedConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.autoFoulPerRoundConfig(scoutingData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const specificTeamRenderTeleopSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('teleop')}>
                Tele-Op {isSectionOpen('teleop') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('teleop') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopScoreByRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopScoreByRoundCombinedConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopAccuracyPerRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.teleopFoulPerMatchConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={specificTeamConfigs.teamTeleopStatsMultiNumberConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <MultiNumberDisplay config={allTeamsConfigs.competitionMultiNumberConfig(scoutingData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const specificTeamRenderEndgameSection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('endgame')}>
                Endgame {isSectionOpen('endgame') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('endgame') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.endgameClimbDataPerRoundConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <PieGraph config={specificTeamConfigs.endgameClimbUsagePieConfig(scoutingData, teamNumber)} />
                    </div>
                    <div className="graph-item">
                        <BarGraph config={specificTeamConfigs.trapPerRoundConfig(scoutingData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const specificTeamRenderSummarySection = () => (
        <div className="section">
            <h2 className="chart-section-title" onClick={() => toggleSection('summary')}>
                Summary {isSectionOpen('summary') ? '▲' : '▼'}
            </h2>
            {isSectionOpen('summary') && (
                <div className="graph-container">
                    <div className="graph-item">
                        <RadarGraph config={specificTeamConfigs.teamPerformanceRadarConfig(scoutingData, teamNumber)} />
                    </div>
                </div>
            )}
        </div>
    );

    const renderAllTeams = () => (
        <>
            {allTeamsRenderGeneralSection()}
            {allTeamsRenderAutonomousSection()}
            {allTeamsRenderTeleopSection()}
            {allTeamsRenderEndgameSection()}
        </>
    );

    const renderSpecificTeam = () => (
        <>
            <div className="team-number-input">
                <label htmlFor="teamNumber">Select Team Number:</label>
                <input
                    type="number"
                    id="teamNumber"
                    value={teamNumber}
                    onChange={handleTeamNumberChange}
                    min="0"
                    placeholder="Enter team number"
                />
            </div>
            {specificTeamRenderGeneralSection()}
            {specificTeamRenderAutonomousSection()}
            {specificTeamRenderTeleopSection()}
            {specificTeamRenderEndgameSection()}
            {specificTeamRenderSummarySection()}
        </>
    );

    const renderComparison = () => (
        <>
            {allTeamsRenderGeneralSection()}
            {allTeamsRenderAutonomousSection()}
            {allTeamsRenderTeleopSection()}
        </>
    );

    const renderSection = () => {
        switch (activeTab) {
            case 'AllTeams':
                return renderAllTeams();
            case 'SpecificTeam':
                return renderSpecificTeam();
            case 'Comparison':
                return renderComparison();
            default:
                return null;
        }
    };

    return (
        <div className="dashboard">
            <h1 className="page-title">Dashboard</h1>

            {/* Tabs */}
            <div className="tabs">
                <button className={activeTab === 'AllTeams' ? 'active-tab' : ''} onClick={() => setActiveTab('AllTeams')}>All Teams</button>
                <button className={activeTab === 'SpecificTeam' ? 'active-tab' : ''} onClick={() => setActiveTab('SpecificTeam')}>Specific Team</button>
                <button className={activeTab === 'Comparison' ? 'active-tab' : ''} onClick={() => setActiveTab('Comparison')}>Comparison</button>
            </div>

            {renderSection()}
        </div>
    );
};

export default Visualization;
