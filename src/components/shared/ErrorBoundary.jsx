import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio render error", error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="grid min-h-screen place-items-center px-4 py-24">
        <div className="max-w-xl rounded-[8px] border border-rose-300/25 bg-rose-500/10 p-6 text-center shadow-neon-soft backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase text-rose-100/70">Render error</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-white">Something could not render.</h1>
          <p className="mt-4 text-sm leading-6 text-white/68">
            The interface hit an unexpected error. Refreshing will retry the current view.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-rose-200/35 bg-rose-200/10 px-5 text-sm font-semibold text-rose-50 transition hover:bg-rose-200/20"
          >
            Reload page
          </button>
        </div>
      </main>
    );
  }
}
