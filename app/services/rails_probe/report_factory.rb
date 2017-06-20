module RailsProbe

  class ReportFactory

    def self.create(profile, **options)
      new(profile, options).create
    end

    def initialize(profile, options)
      @profile = profile
      extract_options(options)
    end

    # @return [Report] - created report.
    def create
      printers.each do |printer|
        p = printer.constantize.new(profile, report, action)
        prints[printer.name] = p.print
      end

      report.data = { prints: prints }
      report
    end

    private

    def report
      @report ||= RailsProbe::Report.create(
        action: action,
        session: session,
        host: host,
        user_id: user_id
      )
    end

    def prints
      @prints ||= {}
    end

    def extract_options(options)
      @action   = options[:action]
      @host     = options[:host]
      @session  = options[:session]
      @printers = options[:printers] || [Printers::Graph]
      @user_id  = options[:user_id]
    end
  end
end