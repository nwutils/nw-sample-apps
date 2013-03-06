{spawn}     = require "child_process"
{platform}  = require "os"
{chmodSync} = require "fs"


class Encoder
  constructor: ({@source,@bitrate,@target,@log}) ->
    @target  ||= @source.replace /\.wav$/, ".mp3"
    @bitrate ||= 128

    switch platform()
      when "darwin"
        @pathToBin = "vendor/bin/osx/shineenc"
      when "win32"
        @pathToBin = "vendor/bin/win32/shineenc.exe"

    # binary may not be executable due to zip compression..
    chmodSync @pathToBin, 0755

  process: ->
    @log "Starting encoding process.."

    @child = spawn @pathToBin, ["-b",@bitrate,@source,@target]

    @child.stdout.on "data", (data) =>
      @log "#{data}"

    @child.stderr.on "data", (data) =>
      @log "ERROR: #{data}"

    @child.on "exit", (code) =>
      @log "Encoding process exited with code: #{code}"
