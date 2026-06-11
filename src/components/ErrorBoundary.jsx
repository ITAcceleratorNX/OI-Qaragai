import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            padding: '32px 24px',
            background: '#111',
            color: '#f5f1ea',
            fontFamily: 'Manrope, system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: 22, marginBottom: 12 }}>Ошибка загрузки приложения</h1>
          <p style={{ color: '#a59c90', marginBottom: 16, maxWidth: 640 }}>
            Страница не смогла отрисоваться. Откройте консоль браузера (F12) или передайте текст
            ошибки ниже разработчику.
          </p>
          <pre
            style={{
              background: '#1a1918',
              border: '1px solid #333',
              borderRadius: 12,
              padding: 16,
              overflow: 'auto',
              fontSize: 13,
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
            }}
          >
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
