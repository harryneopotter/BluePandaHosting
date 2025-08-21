# Intervo.ai Copilot Instructions

## Project Overview
Intervo.ai is an open-source conversational AI platform for voice and chat agents. The system uses a **monorepo structure** with three main packages: `intervo-backend` (Node.js/Express), `intervo-frontend` (Next.js), and `intervo-widget` (Vite/React).

## Architecture Patterns

### Monorepo Structure
- **Root**: Workspace management with npm workspaces
- **Backend** (`packages/intervo-backend/`): Express server with WebSocket support for real-time voice/chat
- **Frontend** (`packages/intervo-frontend/`): Next.js dashboard with workflow canvas (React Flow)
- **Widget** (`packages/intervo-widget/`): Embeddable React widget built with Vite

### Key Service Architecture
```javascript
// Backend follows this modular pattern:
/agents/          // Base agent classes (BaseAgent.js, RAGAgent.js, etc.)
/services/        // AI providers (groqAI.js, openAI.js, mcp-client.js)
/handlers/        // Request handlers (clientHandler.js, twilioHandler.js)
/routes/          // Express routes
/tools/           // MCP (Model Context Protocol) tool integration
```

## Critical Development Workflows

### Environment Setup
```bash
# Development (run from root)
npm install --legacy-peer-deps  # Always use legacy-peer-deps flag
npm run dev:next     # Frontend development
npm run dev --workspace=intervo-backend  # Backend development

# Docker (preferred for full stack)
docker-compose up -d  # Starts MongoDB, frontend, backend, RAG API
```

### Database & External Services
- **MongoDB**: Required for all data persistence
- **Environment Files**: Use `.env.development`, `.env.staging`, `.env.production` pattern
- **External APIs**: Integrates with Twilio, OpenAI, Groq, Google TTS, AWS Polly, Deepgram
- **Storage**: S3-compatible object storage for call recordings

## Project-Specific Conventions

### Agent System Architecture
```javascript
// All agents extend BaseAgent with workflow support
class CustomAgent extends BaseAgent {
  constructor(name, config) {
    super(name, config);
    // Tools are injected by OrchestrationManager
    this.toolManager = null;
    this.intents = config.settings?.intents || [];
  }
}
```

### MCP Tool Integration Pattern
Tools use **Model Context Protocol** for extensibility:
```javascript
// Tools are configured in workflow nodes, not hardcoded
const toolConfig = {
  name: "calendly-scheduler",
  type: "calendly", 
  serverUrl: "http://localhost:8000",
  parameters: { default_duration: 30 }
};
```

### Workflow Canvas Integration
- **Frontend**: Uses `@xyflow/react` for visual workflow editor
- **Backend**: `OrchestrationManager` processes workflow nodes
- **Agent Routing**: Intent-based routing between workflow nodes

### Real-time Communication
```javascript
// WebSocket pattern for voice/chat
// server.js handles both HTTP and WebSocket on same port
const wss = new WebSocket.Server({ server });
// clientHandler.js manages WebSocket connections
// twilioHandler.js manages Twilio media streams
```

## Integration Points

### Voice Processing Pipeline
1. **Twilio** → WebSocket → **Speech-to-Text** (Deepgram/Google/AssemblyAI)
2. **Agent Processing** → **LLM** (Groq/OpenAI) → **Text-to-Speech** (Google/AWS/ElevenLabs)
3. **Audio Stream** → Twilio → User

### RAG Knowledge Base
- **Python service** (`rag_py/`) running on port 4003
- **ChromaDB** for vector storage
- **Document processing**: PDF, DOCX, TXT, website crawling

### Frontend State Management
- **No global state library** - uses React Context and component state
- **API calls** through custom hooks and fetch utilities
- **Real-time updates** via WebSocket connections to backend

## Key Files to Reference

### Backend Core
- `server.js` - Main Express app with WebSocket setup
- `agents/BaseAgent.js` - Agent class hierarchy foundation  
- `services/orchestrationManager.js` - Workflow execution engine
- `handlers/clientHandler.js` - WebSocket message routing
- `tools/MCPTool.js` - External tool integration pattern

### Frontend Core  
- `src/pages/dashboard/` - Main dashboard with workflow canvas
- `src/components/workflow/` - React Flow workflow components
- `src/hooks/` - Custom API and WebSocket hooks

### Shared Patterns
- `docker-compose.yml` - Full development environment setup
- `package.json` workspaces - Monorepo dependency management
- `.env.example` files - Required environment variables

## Development Tips

### PostHog Analytics Pattern
When working with analytics, use enum/constants for event names:
```javascript
const EVENTS = {
  WORKFLOW_CREATED: 'workflow_created',
  AGENT_DEPLOYED: 'agent_deployed'
};
```

### API Response Patterns
Backend consistently returns `{ success: boolean, data: any, error?: string }`

### WebSocket Message Types
Use structured message types: `{ type: 'agent_message', payload: {...}, sessionId: string }`

Always check existing agent/service implementations before creating new ones - the system is designed for extension, not replacement of core components.

## Smriti ##
When available, read `.smriti/context.md` at project load; prefer its summaries when forming completions or chat replies.

## Smriti ##
Always read `.smriti/context.md` before answering questions or suggesting code.

If `.smriti/context.md` hasn’t been updated in the last 24 h, suggest running “Smriti: Update Memory”.